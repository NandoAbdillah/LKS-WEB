<?php

namespace App\Http\Controllers;

use App\Models\Vaccination;
use App\Http\Requests\StoreVaccinationRequest;
use App\Http\Requests\UpdateVaccinationRequest;
use App\Models\Consultation;
use App\Models\Spot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $vaccinations = Vaccination::with('spot.regional', 'vaccine', 'vaccinator')
            ->where('society_id', $request->society->id)->get();
        $result = [];
        foreach ($vaccinations as $key => $value) {
            $keyIndex = '';
            if ($key == 0) {
                $keyIndex = 'first';
            } else {
                $keyIndex = 'second';
            }

            // COUNT before vaccination id
            $countBefore = Vaccination::where('spot_id', $value->spot_id)
                ->where('vaccine_id', $value->vaccine_id)
                ->where('date', $value->date)
                ->where('id', '<', $value->id)
                ->count() + 1;

            $result[$keyIndex]['queue'] = $countBefore;
            $result[$keyIndex]['dose'] = $value->dose;
            $result[$keyIndex]['vaccination_date'] = $value->date;
            $result[$keyIndex]['spot'] = $value->spot;
            $result[$keyIndex]['status'] = 'done';
            $result[$keyIndex]['vaccine'] = $value->vaccine;
            $result[$keyIndex]['vaccinator'] = $value->vaccinator;
        }

        if (count($vaccinations) == 1) {
            $result['second'] = null;
        } elseif (count($vaccinations) == 0) {
            $result['first'] = null;
            $result['second'] = null;
        }

        return response()->json([
            'message' => 'success',
            'data' => [
                'vaccinations' => $result
            ]
        ], 200);
    }


    public function store(Request $request)
    {
        $spot = Spot::find($request->spot_id);
        if (!$spot) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => 'Spot is not found'
            ], 401);
        }
        $validator = Validator::make($request->all(), [
            'date' => 'required|date_format:Y-m-d',
            'spot_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors()
            ], 401);
        }


        $lastConsulations = Consultation::where('society_id', $request->society->id)
            ->first();

        if (!$lastConsulations) {
            return response()->json([
                'message' => 'Your consultation must be accepted by doctor before'
            ], 401);
        } elseif ($lastConsulations->status != 'accepted') {
            return response()->json([
                'message' => 'Your consultation must be accepted by doctor before'
            ], 401);
        }

        $recentVaccination = Vaccination::where('society_id', $request->society->id)
            ->select('date')->get();

        if (count($recentVaccination) == 2) {
            return response()->json([
                'message' => 'Society has been 2x vaccinated'
            ], 401);
        } else if (count($recentVaccination) == 1) {
            // If 2nd vaccination < 30 days from 1st vaccination
            $date = date('Y-m-d', strtotime($recentVaccination[0]->date . ' + 30 days'));
            if ($request->date < $date) {
                return response()->json([
                    'message' => 'Wait at least +30 days from 1st Vaccination'
                ], 401);
            }
        }

        $vaccination = Vaccination::create([
            'dose' => count($recentVaccination) + 1,
            'date' => $request->date,
            'society_id' => $request->society->id,
            'spot_id' => $request->spot_id,
            'vaccine_id' => $lastConsulations->vaccine_id ?? 1,
            'doctor_id' => $lastConsulations->doctor_id ?? 1,
            'officer_id' => $lastConsulations->officer_id ?? 1,
        ]);

        $message = "First vaccination registered successful";
        if ($vaccination->dose == 2) {
            $message = "Second vaccination registered successful";
        }

        return response()->json([
            'message' => $message,
            'data' => $vaccination
        ], 200);
    }
}
