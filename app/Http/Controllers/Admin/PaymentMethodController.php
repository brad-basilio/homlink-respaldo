<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentMethodController extends BasicController
{
    public $model = PaymentMethod::class;
    public $reactView = 'Admin/PaymentMethods';
    public $imageFields = ['image'];

    public function setReactViewProperties(Request $request)
    {
        // Tipos de métodos de pago
        $types = PaymentMethod::getTypes();

        return [
            'types' => $types
        ];
    }

    public function setPaginationInstance(string $model)
    {
        return $model::ordered();
    }

    public function beforeSave(Request $request)
    {
        $data = $request->all();
        
        // Asegurar que el order sea numérico
        if (isset($data['order'])) {
            $data['order'] = (int) $data['order'];
        }

        // Generar slug si no existe
        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        
        return $data;
    }
}
