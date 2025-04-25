<?php

namespace App\Http\Controllers;

use App\Models\Mutasi;
use App\Http\Requests\StoreMutasiRequest;
use App\Http\Requests\UpdateMutasiRequest;
use Illuminate\Http\Request;

class MutasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mutasis = Mutasi::with(['pns', 'asalDesa.kecamatan.kabupatenKota.provinsi', 'tujuanDesa.kecamatan.kabupatenKota.provinsi'])->get();

        return response()->json($mutasis);
    }

    public function latest(Request $request)
    {
        $pns_id = $request->input('pns_id');

        if (!$pns_id) {
            return response()->json(['error' => 'pns_id is required'], 400);
        }

        $latestMutasi = Mutasi::where('pns_id', $pns_id)
        ->with(['tujuanDesa.kecamatan.kabupatenKota.provinsi'])
            ->orderBy('created_at', 'desc')
            ->first();

        // Jika tidak ada data mutasi, kembalikan response kosong (atau sesuai kebutuhan)
        if (!$latestMutasi) {
            return response()->json([], 200);
        }

        return response()->json($latestMutasi, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'pns_id' => 'required|exists:pegawai_negeri_sipils,id',
            'asal_desa_id' => 'required|exists:desas,id',
            'tujuan_desa_id' => 'required|exists:desas,id',
            'tanggal_mutasi' => 'required|date',
            'jabatan_lama' => 'nullable|string',
            'jabatan_baru' => 'nullable|string',
            'instansi_asal' => 'nullable|string',
            'instansi_tujuan' => 'nullable|string',
            'keterangan' => 'nullable|string'
        ]);


        $mutasi = Mutasi::create($data);

        return response()->json($mutasi, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $mutasi = Mutasi::with('pns', 'asalDesa.kecamatan.kabupatenKota.provinsi', 'tujuanDesa.kecamatan.kabupatenKota.provinsi')->findOrFail($id);


        return response()->json($mutasi);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mutasi $mutasi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $mutasi = Mutasi::findOrFail($id);

        $data = $request->validate([
            'pns_id' => 'sometimes|exists::pegawai_negeri_sipils,id',
            'asal_desa_id' => 'sometimes|exists:desas,id',
            'tujuan_desa_id' => 'sometimes|exists:desas,id',
            'tanggal_mutasi' => 'sometimes|date',
            'jabatan_lama' => 'nullable|string',
            'jabatan_baru' => 'nullable|string',
            'instansi_asal' => 'nullable|string',
            'instansi_tujuan' => 'nullable|string',
            'keterangan' => 'nullable|string'
        ]);


        $mutasi->update($data);

        return response()->json($mutasi);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $mutasi = Mutasi::findOrFail($id);
        $mutasi->delete();

        return response()->json(['message' => 'Mutasi deleted successfully']);
    }
}
