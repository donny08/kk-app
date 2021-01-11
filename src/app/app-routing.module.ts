import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NativeScriptHttpClientModule } from "@nativescript/angular";

const routes: Routes = [
    { path: "", redirectTo: "/settings", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes), NativeScriptHttpClientModule],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
