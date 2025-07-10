<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\General;
use App\Models\AdminNotifiable;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Notifications\MessageContactNotification;
use App\Notifications\AdminContactNotification;
use App\Helpers\NotificationHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends BasicController
{
    public $model = Message::class;

    public function beforeSave(Request $request): array
    {
        Log::info('MessageController::beforeSave - Iniciando validación', [
            'request_data' => $request->all(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);

        $messages = [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'email.email' => 'El correo electrónico debe tener el formato user@domain.com.',
            'email.max' => 'El correo electrónico no debe exceder los 320 caracteres.',
            'phone.string' => 'El teléfono debe ser una cadena de texto.',
            'contact_type.string' => 'El tipo de contacto debe ser una cadena de texto.',
            'ruc.string' => 'El RUC debe ser una cadena de texto.',
            'description.required' => 'El mensaje es obligatorio.',
            'description.string' => 'El mensaje debe ser una cadena de texto.'
        ];

        // Validación de los datos
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'nullable|email|max:320',
            'phone' => 'nullable|string',
            'contact_type' => 'nullable|string',
            'ruc' => 'nullable|string',
            'subject' => 'required|string',
            'description' => 'required|string',
        ], $messages);

        Log::info('MessageController::beforeSave - Datos validados', [
            'validated_data' => $validatedData
        ]);

        return $validatedData;
    }

    public function afterSave(Request $request, object $jpa, ?bool $isNew)
    {
        try {
            Log::info('MessageController - Iniciando envío de notificaciones', [
                'message_id' => $jpa->id,
                'client_email' => $jpa->email,
                'contact_type' => $jpa->contact_type ?? 'unknown',
                'name' => $jpa->name
            ]);

            // Enviar notificación al cliente y al administrador usando el helper
            NotificationHelper::sendContactNotification($jpa);

            Log::info('MessageController - Notificaciones enviadas exitosamente');

        } catch (\Exception $e) {
            Log::error('MessageController - Error al enviar notificaciones de contacto', [
                'message_id' => $jpa->id ?? 'unknown',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}
