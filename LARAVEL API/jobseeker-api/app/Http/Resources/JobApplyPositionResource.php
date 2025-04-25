<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobApplyPositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "position" => $this->whenLoaded('position')->position,
            "apply_status" => $this->status,
            "notes" => $this->whenLoaded('jobApplySociety')->notes,
        ];
    }

   
}
