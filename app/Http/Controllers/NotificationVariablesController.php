<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Notifications\MessageContactNotification;
use App\Notifications\AdminContactNotification;
use App\Notifications\PurchaseSummaryNotification;
use App\Notifications\OrderStatusChangedNotification;
use App\Notifications\BlogPublishedNotification;
use App\Notifications\ClaimNotification;
use App\Notifications\PasswordChangedNotification;
use App\Notifications\PasswordResetLinkNotification;
use App\Notifications\SubscriptionNotification;
use App\Notifications\VerifyAccountNotification;

class NotificationVariablesController extends Controller
{
    /**
     * Obtiene las variables disponibles para un tipo de notificación específico.
     */
    public function getVariables(string $type): JsonResponse
    {
        $notificationMap = [
            'message_contact' => MessageContactNotification::class,
            'admin_contact_notification' => AdminContactNotification::class,
            'purchase_summary' => PurchaseSummaryNotification::class,
            'order_status_changed' => OrderStatusChangedNotification::class,
            'blog_published' => BlogPublishedNotification::class,
            'claim' => ClaimNotification::class,
            'password_changed' => PasswordChangedNotification::class,
            'password_reset' => PasswordResetLinkNotification::class,
            'subscription' => SubscriptionNotification::class,
            'verify_account' => VerifyAccountNotification::class,
        ];

        if (!isset($notificationMap[$type])) {
            return response()->json([
                'error' => 'Tipo de notificación no encontrado',
                'available_types' => array_keys($notificationMap)
            ], 404);
        }

        $notificationClass = $notificationMap[$type];
        
        try {
            $variables = $notificationClass::availableVariables();
            
            return response()->json([
                'type' => $type,
                'variables' => $variables
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener las variables',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtiene todos los tipos de notificaciones disponibles.
     */
    public function getAllTypes(): JsonResponse
    {
        return response()->json([
            'types' => [
                'message_contact' => 'Confirmación de contacto (cliente)',
                'admin_contact_notification' => 'Notificación de contacto (admin)',
                'purchase_summary' => 'Resumen de compra',
                'order_status_changed' => 'Cambio de estado de pedido',
                'blog_published' => 'Blog publicado',
                'claim' => 'Reclamo',
                'password_changed' => 'Contraseña cambiada',
                'password_reset' => 'Restablecer contraseña',
                'subscription' => 'Suscripción',
                'verify_account' => 'Verificación de cuenta',
            ]
        ]);
    }
}
