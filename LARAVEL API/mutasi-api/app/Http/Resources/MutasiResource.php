<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MutasiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tanggal_mutasi' => $this->tanggal_mutasi,
            'jabatan_lama' => $this->jabatan_lama,
            'jabatan_baru' => $this->jabatan_baru,
            'asal_detail' => $this->whenLoaded('asalDetail'),
            'tujuan_detail' => $this->whenLoaded('tujuanDetail')

        ];
    }
}
