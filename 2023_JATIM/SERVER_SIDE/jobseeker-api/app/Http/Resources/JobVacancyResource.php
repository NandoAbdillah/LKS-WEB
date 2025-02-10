<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobVacancyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'vacancies';

    
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category' => new JobCategoryResource($this->whenLoaded('jobCategory')),
            'company' => $this->company,
            'address' => $this->address,
            'description' => $this->description,
            'available_position' => AvailablePositionResource::collection($this->whenLoaded('availablePositions')),
        ];


    }
}
