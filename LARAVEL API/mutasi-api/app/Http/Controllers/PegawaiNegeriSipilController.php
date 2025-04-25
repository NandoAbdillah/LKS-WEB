<?php

namespace App\Http\Controllers;

use App\Models\PegawaiNegeriSipil;
use App\Http\Requests\StorePegawaiNegeriSipilRequest;
use App\Http\Requests\UpdatePegawaiNegeriSipilRequest;
use App\Models\Permintaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PegawaiNegeriSipilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function me(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'me' => $request->user()
        ], 200);
    }

    public function mutationHist(Request $request)
    {
        $mutasis = $request->user()->mutasis()->with('asalDesa', 'tujuanDesa')->get();

        return response()->json($mutasis);
    }

    public function mutationHistById(Request $request, $id)
    {
        $mutasi = $request->user()->mutasis()->with('asalDesa', 'tujuanDesa')->findOrFail($id);

        return response()->json($mutasi);
    }

    public function allRequest(Request $request)
    {
        $permintaans = $request->user()->permintaans()->get();
        return response()->json($permintaans);
    }

    public function storeRequest(Request $request)
    {
        $data = $request->validate([
            'tipe' => 'required|in:perubahan_biodata,mutasi',
            'data_perubahan' => 'required|string'
        ]);


        $data['pns_id'] = $request->user()->id;
        $permintaan = Permintaan::create($data);

        return response()->json([
            'status' => 'successfull',
            'request' => $permintaan
        ], 201);
    }

    public function requestById(Request $request, $id)
    {
       $permintaan = $request->user()->permintaans()->findOrFail($id);

       return response()->json($permintaan);
    }



    // Untuk Admin
    public function index()
    {
        $pns = PegawaiNegeriSipil::all();

        return response()->json($pns);

    }

    public function show($id)
    {
       $pns = PegawaiNegeriSipil::findOrFail($id);
       return response()->json($pns);
    }

    public function update(Request $request, $id){
        $pns = PegawaiNegeriSipil::findOrFail($id);

        $data = $request->validate([
            'nama' => 'sometimes|string',
            'tanggal_lahir' => 'sometimes|date',
            'tempat_lahir' => 'sometimes|string',
            'jabatan' => 'sometimes|string',
            'email' => 'sometimes|email',
            'telepon' => 'sometimes|string'
        ]);

        $pns->update($data);

        return response()->json($pns);


    }

    public function store(Request $request) {
        $request->validate([
            'nama' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'required|string',
            'jabatan' => 'required|string',
            'desa_id' => 'required|exists:desas,id',
            'email' => 'required|email',
            'telepon' => 'required|numeric',
            'password' => 'required|string|min:8'
        ]);

        $pns = PegawaiNegeriSipil::create([
            'nama' => $request->nama,
            'tanggal_lahir' => $request->tanggal_lahir,
            'tempat_lahir' => $request->tempat_lahir,
            'jabatan' => $request->jabatan,
            'email' => $request->email,
            'desa_id' => $request->desa_id,
            'telepon' => $request->telepon,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => "success",
            'data' => $pns
        ], 201);

    }

    public function destroy($id)
    {
        $pns = PegawaiNegeriSipil::findOrFail($id);
        $pns->delete();

        return response()->json([
            'message' => 'PNS deleted successfully'
        ]);
    }
}
