<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ValidationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */


    public static $wrap = 'validation';


    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'work_experience' => $this->work_experience,
            'job_category_id' => $this->job_category_id,
            'society_id' => $this->society_id,
            // 'validator_id' => $this->validation_id,
            'job_position' => $this->job_position,
            'reason_accepted' => $this->reason_accepted,
            'validator_notes' => $this->validator_notes,
            'validator' => new ValidatorResource($this->whenLoaded('validator'))
        ];
    }

    public function toBrut(Request $request) {

        return [
            'id' => $this->id,
            'status' => $this->status,
            'work_experience' => $this->work_experience,
            'society_id' => $this->society_id,
            'job_position' => $this->job_position,
            'reason_accepted' => $this->reason_accepted,
            'validator_notes' => $this->validator_notes,
            'validator' => new ValidatorResource($this->whenLoaded('validator'))
        ];
    }
}
