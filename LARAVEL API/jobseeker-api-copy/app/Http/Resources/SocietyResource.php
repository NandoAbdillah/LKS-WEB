<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SocietyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'born_date' => $this->born_date,
            'gender' => $this->gender,
            'address' => $this->address,
            'regional' => new RegionalResource($this->whenLoaded('regional'))
        ];
    }
}
