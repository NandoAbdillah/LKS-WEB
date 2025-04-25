<?php

namespace App\Http\Controllers;

use App\Models\Permintaan;
use App\Http\Requests\StorePermintaanRequest;
use App\Http\Requests\UpdatePermintaanRequest;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class PermintaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $permintaans = Permintaan::with('pns')->get();

         return response()->json($permintaans);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $permintaan = Permintaan::findOrFail($id);
        return response()->json($permintaan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $permintaan = Permintaan::findOrFail($id);
        $permintaan->delete();

        return response()->json(['message' => 'Permintaan delted successfully']);

    }


    public function approve(Request $request, $id)
    {
        $permintaan = Permintaan::findOrFail($id);

        $data = $request->validate([
            'catatan' => 'nullable|string'
        ]);

        $permintaan->update([
            'status' => 'disetujui',
            'catatan' => $data['catatan'] ?? null
        ]);


        return response()->json($permintaan);
    }


    public function reject(Request $request, $id) {
        $permintaan = Permintaan::findOrFail($id);

        $data = $request->validate([
            'alasan' => 'nullable|string'
        ]);

        $permintaan->update([
            'status' => 'ditolak',
            'catatan' => $data['alasan'] ?? null
        ]);

        return response()->json($permintaan);
    }
}


