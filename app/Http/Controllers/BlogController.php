<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use App\Models\LandingHome;

class BlogController extends BasicController
{
    public $reactView = 'Blog';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $categories = Category::select([
            DB::raw('DISTINCT(categories.id)'),
            'categories.name'
        ])
            ->join('posts', 'posts.category_id', 'categories.id')
            ->where('categories.visible', true)
            ->where('categories.status', true)
            ->get();
        $postRecent = Post::where('status', true)->orderBy('created_at', 'desc')->with('category')->limit(3)->get();
        $landing = LandingHome::where('correlative', 'like', 'page_blog%')->get();
        return [
            'categories' => $categories,
            'postRecent' => $postRecent,
            'landing' => $landing
        ];
    }
}
