<?php

namespace App\Http\Controllers;

use App\Models\Provinsi;
use App\Http\Requests\StoreProvinsiRequest;
use App\Http\Requests\UpdateProvinsiRequest;
use App\Models\Desa;
use App\Models\KabupatenKota;
use App\Models\Kecamatan;
use Illuminate\Http\Request;

class ProvinsiController extends Controller
{
    public function provinsi()
    {
        $provinsi = Provinsi::all();
        return response()->json($provinsi);
    }

    public function kabupaten(Request $request)
    {
        $query = KabupatenKota::query();
        if ($request->has('provinsi_id')) {
            $query->where('provinsi_id', $request->input('provinsi_id'));
        }

        $kabupaten = $query->get();
        return response()->json($kabupaten);
    }



    // GET /api/wilayah/kecamatan?kabupaten_id=1
    public function kecamatan(Request $request)
    {
        $query = Kecamatan::query();
        if ($request->has('kabupaten_kota_id')) {
            $query->where('kabupaten_kota_id', $request->input('kabupaten_kota_id'));
        }
        $kecamatan = $query->get();

        return response()->json($kecamatan);
    }

    public function desa(Request $request)
    {
        $query = Desa::query();
        if ($request->has('kecamatan_id')) {
            $query->where('kecamatan_id', $request->input('kecamatan_id'));
        }
        $desa = $query->get();
        return response()->json($desa);
    }

    public function fullWilayah()
    {
        $provinsi = Provinsi::with(['kabupatenKotas.kecamatans.desas'])->get();

        return response()->json($provinsi);
    }
}
