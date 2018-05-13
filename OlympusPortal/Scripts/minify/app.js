webpackJsonp([1],{

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_utils_1 = __webpack_require__(143);
var Observable_1 = __webpack_require__(0);
var VgFullscreenAPI = (function () {
    function VgFullscreenAPI() {
        this.nativeFullscreen = true;
        this.isFullscreen = false;
        this.onChangeFullscreen = new core_1.EventEmitter();
    }
    VgFullscreenAPI.prototype.init = function (elem, medias) {
        var _this = this;
        this.videogularElement = elem;
        this.medias = medias;
        var APIs = {
            w3: {
                enabled: 'fullscreenEnabled',
                element: 'fullscreenElement',
                request: 'requestFullscreen',
                exit: 'exitFullscreen',
                onchange: 'fullscreenchange',
                onerror: 'fullscreenerror'
            },
            newWebkit: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitRequestFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            oldWebkit: {
                enabled: 'webkitIsFullScreen',
                element: 'webkitCurrentFullScreenElement',
                request: 'webkitRequestFullScreen',
                exit: 'webkitCancelFullScreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            moz: {
                enabled: 'mozFullScreen',
                element: 'mozFullScreenElement',
                request: 'mozRequestFullScreen',
                exit: 'mozCancelFullScreen',
                onchange: 'mozfullscreenchange',
                onerror: 'mozfullscreenerror'
            },
            ios: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitEnterFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitendfullscreen',
                // Hack for iOS: webkitfullscreenchange it's not firing
                onerror: 'webkitfullscreenerror'
            },
            ms: {
                enabled: 'msFullscreenEnabled',
                element: 'msFullscreenElement',
                request: 'msRequestFullscreen',
                exit: 'msExitFullscreen',
                onchange: 'MSFullscreenChange',
                onerror: 'MSFullscreenError'
            }
        };
        for (var browser in APIs) {
            if (APIs[browser].enabled in document) {
                this.polyfill = APIs[browser];
                break;
            }
        }
        if (vg_utils_1.VgUtils.isiOSDevice()) {
            this.polyfill = APIs.ios;
        }
        this.isAvailable = (this.polyfill != null);
        if (this.polyfill == null) {
            return;
        }
        var fsElemDispatcher;
        switch (this.polyfill.onchange) {
            // Mozilla dispatches the fullscreen change event from document, not the element
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=724816#c3
            case 'mozfullscreenchange':
                fsElemDispatcher = document;
                break;
            // iOS dispatches the fullscreen change event from video element
            case 'webkitendfullscreen':
                fsElemDispatcher = this.medias.toArray()[0].elem;
                break;
            // HTML5 implementation dispatches the fullscreen change event from the element
            default:
                fsElemDispatcher = elem;
        }
        this.fsChangeSubscription = Observable_1.Observable.fromEvent(fsElemDispatcher, this.polyfill.onchange).subscribe(function () {
            _this.onFullscreenChange();
        });
    };
    VgFullscreenAPI.prototype.onFullscreenChange = function () {
        this.isFullscreen = !!document[this.polyfill.element];
        this.onChangeFullscreen.next(this.isFullscreen);
    };
    VgFullscreenAPI.prototype.toggleFullscreen = function (element) {
        if (element === void 0) { element = null; }
        if (this.isFullscreen) {
            this.exit();
        }
        else {
            this.request(element);
        }
    };
    VgFullscreenAPI.prototype.request = function (elem) {
        if (!elem) {
            elem = this.videogularElement;
        }
        this.isFullscreen = true;
        this.onChangeFullscreen.next(true);
        // Perform native full screen support
        if (this.isAvailable && this.nativeFullscreen) {
            // Fullscreen for mobile devices
            if (vg_utils_1.VgUtils.isMobileDevice()) {
                // We should make fullscreen the video object if it doesn't have native fullscreen support
                // Fallback! We can't set vg-player on fullscreen, only video/audio objects
                if ((!this.polyfill.enabled && elem === this.videogularElement) || vg_utils_1.VgUtils.isiOSDevice()) {
                    elem = this.medias.toArray()[0].elem;
                }
                this.enterElementInFullScreen(elem);
            }
            else {
                this.enterElementInFullScreen(this.videogularElement);
            }
        }
    };
    VgFullscreenAPI.prototype.enterElementInFullScreen = function (elem) {
        elem[this.polyfill.request]();
    };
    VgFullscreenAPI.prototype.exit = function () {
        this.isFullscreen = false;
        this.onChangeFullscreen.next(false);
        // Exit from native fullscreen
        if (this.isAvailable && this.nativeFullscreen) {
            document[this.polyfill.exit]();
        }
    };
    VgFullscreenAPI.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    VgFullscreenAPI.ctorParameters = function () { return []; };
    return VgFullscreenAPI;
}());
exports.VgFullscreenAPI = VgFullscreenAPI;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZnVsbHNjcmVlbi1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1mdWxsc2NyZWVuLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSx1Q0FBcUM7QUFHckMsOENBQTZDOztJQWdCekM7Z0NBVDRCLElBQUk7NEJBQ1IsS0FBSztrQ0FNVyxJQUFJLG1CQUFZLEVBQUU7S0FHekQ7SUFFRCw4QkFBSSxHQUFKLFVBQUssSUFBaUIsRUFBRSxNQUEwQjtRQUFsRCxpQkE4RkM7UUE3RkcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFNLElBQUksR0FBRztZQUNULEVBQUUsRUFBRTtnQkFDQSxPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixPQUFPLEVBQUUsaUJBQWlCO2FBQzdCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLE9BQU8sRUFBRSx1QkFBdUI7YUFDbkM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLG9CQUFvQjtnQkFDN0IsT0FBTyxFQUFFLGdDQUFnQztnQkFDekMsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsSUFBSSxFQUFFLHdCQUF3QjtnQkFDOUIsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsT0FBTyxFQUFFLHVCQUF1QjthQUNuQztZQUNELEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsT0FBTyxFQUFFLG9CQUFvQjthQUNoQztZQUNELEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxJQUFJLEVBQUUsc0JBQXNCO2dCQUM1QixRQUFRLEVBQUUscUJBQXFCOztnQkFDL0IsT0FBTyxFQUFFLHVCQUF1QjthQUNuQztZQUNELEVBQUUsRUFBRTtnQkFDQSxPQUFPLEVBQUUscUJBQXFCO2dCQUM5QixPQUFPLEVBQUUscUJBQXFCO2dCQUM5QixPQUFPLEVBQUUscUJBQXFCO2dCQUM5QixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixPQUFPLEVBQUUsbUJBQW1CO2FBQy9CO1NBQ0osQ0FBQztRQUVGLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFFLE9BQU8sQ0FBRSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBRSxPQUFPLENBQUUsQ0FBQztnQkFDaEMsS0FBSyxDQUFDO2FBQ1Q7U0FDSjtRQUVELEVBQUUsQ0FBQyxDQUFDLGtCQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtTQUMzQjtRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBRTNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUM7U0FDVjtRQUVELElBQUksZ0JBQWdCLENBQUM7UUFFckIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7WUFHN0IsS0FBSyxxQkFBcUI7Z0JBQ3RCLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztnQkFDNUIsS0FBSyxDQUFDOztZQUdWLEtBQUsscUJBQXFCO2dCQUN0QixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQztnQkFDbkQsS0FBSyxDQUFDOztZQUdWO2dCQUNJLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNqRyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM3QixDQUFDLENBQUM7S0FDTjtJQUVELDRDQUFrQixHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25EO0lBRUQsMENBQWdCLEdBQWhCLFVBQWlCLE9BQW1CO1FBQW5CLHdCQUFBLEVBQUEsY0FBbUI7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekI7S0FDSjtJQUVELGlDQUFPLEdBQVAsVUFBUSxJQUFTO1FBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNqQztRQUVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7WUFFNUMsRUFBRSxDQUFDLENBQUMsa0JBQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztnQkFHM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxrQkFBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkYsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDO2lCQUMxQztnQkFFRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDekQ7U0FDSjtLQUNKO0lBRUQsa0RBQXdCLEdBQXhCLFVBQXlCLElBQVM7UUFDOUIsSUFBSSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFFLEVBQUUsQ0FBQztLQUNuQztJQUVELDhCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFLEVBQUUsQ0FBQztTQUNwQztLQUNKOztnQkFyS0osaUJBQVU7Ozs7MEJBTlg7O0FBT2EsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdVdGlscyB9IGZyb20gJy4vdmctdXRpbHMnO1xuaW1wb3J0IHsgVmdNZWRpYSB9IGZyb20gJy4uL3ZnLW1lZGlhL3ZnLW1lZGlhJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmdGdWxsc2NyZWVuQVBJIHtcbiAgICBwb2x5ZmlsbDogYW55O1xuICAgIG9uY2hhbmdlOiBzdHJpbmc7XG4gICAgb25lcnJvcjogc3RyaW5nO1xuICAgIG5hdGl2ZUZ1bGxzY3JlZW46IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlzRnVsbHNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzQXZhaWxhYmxlOiBib29sZWFuO1xuICAgIHZpZGVvZ3VsYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBtZWRpYXM6IFF1ZXJ5TGlzdDxWZ01lZGlhPjtcblxuICAgIGZzQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgb25DaGFuZ2VGdWxsc2NyZWVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGluaXQoZWxlbTogSFRNTEVsZW1lbnQsIG1lZGlhczogUXVlcnlMaXN0PFZnTWVkaWE+KSB7XG4gICAgICAgIHRoaXMudmlkZW9ndWxhckVsZW1lbnQgPSBlbGVtO1xuICAgICAgICB0aGlzLm1lZGlhcyA9IG1lZGlhcztcblxuICAgICAgICBjb25zdCBBUElzID0ge1xuICAgICAgICAgICAgdzM6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAnZnVsbHNjcmVlbkVuYWJsZWQnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdmdWxsc2NyZWVuRWxlbWVudCcsXG4gICAgICAgICAgICAgICAgcmVxdWVzdDogJ3JlcXVlc3RGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICAgICBleGl0OiAnZXhpdEZ1bGxzY3JlZW4nLFxuICAgICAgICAgICAgICAgIG9uY2hhbmdlOiAnZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAgICAgb25lcnJvcjogJ2Z1bGxzY3JlZW5lcnJvcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXdXZWJraXQ6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAnd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICd3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCcsXG4gICAgICAgICAgICAgICAgcmVxdWVzdDogJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICAgICBleGl0OiAnd2Via2l0RXhpdEZ1bGxzY3JlZW4nLFxuICAgICAgICAgICAgICAgIG9uY2hhbmdlOiAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAgICAgb25lcnJvcjogJ3dlYmtpdGZ1bGxzY3JlZW5lcnJvcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbGRXZWJraXQ6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAnd2Via2l0SXNGdWxsU2NyZWVuJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnd2Via2l0Q3VycmVudEZ1bGxTY3JlZW5FbGVtZW50JyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiAnd2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4nLFxuICAgICAgICAgICAgICAgIGV4aXQ6ICd3ZWJraXRDYW5jZWxGdWxsU2NyZWVuJyxcbiAgICAgICAgICAgICAgICBvbmNoYW5nZTogJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgICAgIG9uZXJyb3I6ICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW96OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogJ21vekZ1bGxTY3JlZW4nLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdtb3pGdWxsU2NyZWVuRWxlbWVudCcsXG4gICAgICAgICAgICAgICAgcmVxdWVzdDogJ21velJlcXVlc3RGdWxsU2NyZWVuJyxcbiAgICAgICAgICAgICAgICBleGl0OiAnbW96Q2FuY2VsRnVsbFNjcmVlbicsXG4gICAgICAgICAgICAgICAgb25jaGFuZ2U6ICdtb3pmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICAgICBvbmVycm9yOiAnbW96ZnVsbHNjcmVlbmVycm9yJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlvczoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICd3ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCcsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ3dlYmtpdEZ1bGxzY3JlZW5FbGVtZW50JyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiAnd2Via2l0RW50ZXJGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICAgICBleGl0OiAnd2Via2l0RXhpdEZ1bGxzY3JlZW4nLFxuICAgICAgICAgICAgICAgIG9uY2hhbmdlOiAnd2Via2l0ZW5kZnVsbHNjcmVlbicsIC8vIEhhY2sgZm9yIGlPUzogd2Via2l0ZnVsbHNjcmVlbmNoYW5nZSBpdCdzIG5vdCBmaXJpbmdcbiAgICAgICAgICAgICAgICBvbmVycm9yOiAnd2Via2l0ZnVsbHNjcmVlbmVycm9yJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1zOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogJ21zRnVsbHNjcmVlbkVuYWJsZWQnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICdtc0Z1bGxzY3JlZW5FbGVtZW50JyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiAnbXNSZXF1ZXN0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgZXhpdDogJ21zRXhpdEZ1bGxzY3JlZW4nLFxuICAgICAgICAgICAgICAgIG9uY2hhbmdlOiAnTVNGdWxsc2NyZWVuQ2hhbmdlJyxcbiAgICAgICAgICAgICAgICBvbmVycm9yOiAnTVNGdWxsc2NyZWVuRXJyb3InXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChsZXQgYnJvd3NlciBpbiBBUElzKSB7XG4gICAgICAgICAgICBpZiAoQVBJc1sgYnJvd3NlciBdLmVuYWJsZWQgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbHlmaWxsID0gQVBJc1sgYnJvd3NlciBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFZnVXRpbHMuaXNpT1NEZXZpY2UoKSkge1xuICAgICAgICAgICAgdGhpcy5wb2x5ZmlsbCA9IEFQSXMuaW9zXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQXZhaWxhYmxlID0gKHRoaXMucG9seWZpbGwgIT0gbnVsbCk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9seWZpbGwgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZzRWxlbURpc3BhdGNoZXI7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnBvbHlmaWxsLm9uY2hhbmdlKSB7XG4gICAgICAgICAgICAvLyBNb3ppbGxhIGRpc3BhdGNoZXMgdGhlIGZ1bGxzY3JlZW4gY2hhbmdlIGV2ZW50IGZyb20gZG9jdW1lbnQsIG5vdCB0aGUgZWxlbWVudFxuICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03MjQ4MTYjYzNcbiAgICAgICAgICAgIGNhc2UgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnOlxuICAgICAgICAgICAgICAgIGZzRWxlbURpc3BhdGNoZXIgPSBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gaU9TIGRpc3BhdGNoZXMgdGhlIGZ1bGxzY3JlZW4gY2hhbmdlIGV2ZW50IGZyb20gdmlkZW8gZWxlbWVudFxuICAgICAgICAgICAgY2FzZSAnd2Via2l0ZW5kZnVsbHNjcmVlbic6XG4gICAgICAgICAgICAgICAgZnNFbGVtRGlzcGF0Y2hlciA9IHRoaXMubWVkaWFzLnRvQXJyYXkoKVsgMCBdLmVsZW07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIEhUTUw1IGltcGxlbWVudGF0aW9uIGRpc3BhdGNoZXMgdGhlIGZ1bGxzY3JlZW4gY2hhbmdlIGV2ZW50IGZyb20gdGhlIGVsZW1lbnRcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZnNFbGVtRGlzcGF0Y2hlciA9IGVsZW07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZzQ2hhbmdlU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZnNFbGVtRGlzcGF0Y2hlciwgdGhpcy5wb2x5ZmlsbC5vbmNoYW5nZSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRnVsbHNjcmVlbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPSAhIWRvY3VtZW50WyB0aGlzLnBvbHlmaWxsLmVsZW1lbnQgXTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4ubmV4dCh0aGlzLmlzRnVsbHNjcmVlbik7XG4gICAgfVxuXG4gICAgdG9nZ2xlRnVsbHNjcmVlbihlbGVtZW50OiBhbnkgPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5leGl0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXF1ZXN0KGVsZW06IGFueSkge1xuICAgICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgICAgIGVsZW0gPSB0aGlzLnZpZGVvZ3VsYXJFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlRnVsbHNjcmVlbi5uZXh0KHRydWUpO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gbmF0aXZlIGZ1bGwgc2NyZWVuIHN1cHBvcnRcbiAgICAgICAgaWYgKHRoaXMuaXNBdmFpbGFibGUgJiYgdGhpcy5uYXRpdmVGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAvLyBGdWxsc2NyZWVuIGZvciBtb2JpbGUgZGV2aWNlc1xuICAgICAgICAgICAgaWYgKFZnVXRpbHMuaXNNb2JpbGVEZXZpY2UoKSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIHNob3VsZCBtYWtlIGZ1bGxzY3JlZW4gdGhlIHZpZGVvIG9iamVjdCBpZiBpdCBkb2Vzbid0IGhhdmUgbmF0aXZlIGZ1bGxzY3JlZW4gc3VwcG9ydFxuICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrISBXZSBjYW4ndCBzZXQgdmctcGxheWVyIG9uIGZ1bGxzY3JlZW4sIG9ubHkgdmlkZW8vYXVkaW8gb2JqZWN0c1xuICAgICAgICAgICAgICAgIGlmICgoIXRoaXMucG9seWZpbGwuZW5hYmxlZCAmJiBlbGVtID09PSB0aGlzLnZpZGVvZ3VsYXJFbGVtZW50KSB8fCBWZ1V0aWxzLmlzaU9TRGV2aWNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IHRoaXMubWVkaWFzLnRvQXJyYXkoKVsgMCBdLmVsZW07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRlckVsZW1lbnRJbkZ1bGxTY3JlZW4oZWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyRWxlbWVudEluRnVsbFNjcmVlbih0aGlzLnZpZGVvZ3VsYXJFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVudGVyRWxlbWVudEluRnVsbFNjcmVlbihlbGVtOiBhbnkpIHtcbiAgICAgICAgZWxlbVsgdGhpcy5wb2x5ZmlsbC5yZXF1ZXN0IF0oKTtcbiAgICB9XG5cbiAgICBleGl0KCkge1xuICAgICAgICB0aGlzLmlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlRnVsbHNjcmVlbi5uZXh0KGZhbHNlKTtcblxuICAgICAgICAvLyBFeGl0IGZyb20gbmF0aXZlIGZ1bGxzY3JlZW5cbiAgICAgICAgaWYgKHRoaXMuaXNBdmFpbGFibGUgJiYgdGhpcy5uYXRpdmVGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudFsgdGhpcy5wb2x5ZmlsbC5leGl0IF0oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var VgUtils = (function () {
    function VgUtils() {
    }
    /**
     * Inspired by Paul Irish
     * https://gist.github.com/paulirish/211209
     * @returns {number}
     */
    /**
         * Inspired by Paul Irish
         * https://gist.github.com/paulirish/211209
         * @returns {number}
         */
    VgUtils.getZIndex = /**
         * Inspired by Paul Irish
         * https://gist.github.com/paulirish/211209
         * @returns {number}
         */
    function () {
        var zIndex = 1;
        var elementZIndex;
        var tags = document.getElementsByTagName('*');
        for (var i = 0, l = tags.length; i < l; i++) {
            elementZIndex = parseInt(window.getComputedStyle(tags[i])["z-index"], 10);
            if (elementZIndex > zIndex) {
                zIndex = elementZIndex + 1;
            }
        }
        return zIndex;
    };
    // Very simple mobile detection, not 100% reliable
    // Very simple mobile detection, not 100% reliable
    VgUtils.isMobileDevice = 
    // Very simple mobile detection, not 100% reliable
    function () {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
    };
    ;
    VgUtils.isiOSDevice = function () {
        return (navigator.userAgent.match(/ip(hone|ad|od)/i) && !navigator.userAgent.match(/(iemobile)[\/\s]?([\w\.]*)/i));
    };
    ;
    VgUtils.isCordova = function () {
        return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    };
    ;
    VgUtils.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    VgUtils.ctorParameters = function () { return []; };
    return VgUtils;
}());
exports.VgUtils = VgUtils;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5Qzs7OztJQUlyQzs7OztPQUlHOzs7Ozs7SUFDSSxpQkFBUzs7Ozs7SUFBaEI7UUFDSSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLGFBQW9CLENBQUM7UUFFekIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFMUUsRUFBRSxDQUFDLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sR0FBRyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCO0lBRUQsa0RBQWtEOztJQUMzQyxzQkFBYzs7SUFBckI7UUFDSSxNQUFNLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFHO0lBQUEsQ0FBQztJQUVLLG1CQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztLQUN0SDtJQUFBLENBQUM7SUFFSyxpQkFBUyxHQUFoQjtRQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUM1RjtJQUFBLENBQUM7O2dCQW5DTCxpQkFBVTs7OztrQkFGWDs7QUFHYSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZ1V0aWxzIHtcbiAgICAvKipcbiAgICAgKiBJbnNwaXJlZCBieSBQYXVsIElyaXNoXG4gICAgICogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzIxMTIwOVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgc3RhdGljIGdldFpJbmRleCgpOm51bWJlciB7XG4gICAgICAgIGxldCB6SW5kZXggPSAxO1xuICAgICAgICBsZXQgZWxlbWVudFpJbmRleDpudW1iZXI7XG5cbiAgICAgICAgbGV0IHRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGFncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGVsZW1lbnRaSW5kZXggPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YWdzW2ldKVtcInotaW5kZXhcIl0sIDEwKTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRaSW5kZXggPiB6SW5kZXgpIHtcbiAgICAgICAgICAgICAgICB6SW5kZXggPSBlbGVtZW50WkluZGV4ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB6SW5kZXg7XG4gICAgfVxuXG4gICAgLy8gVmVyeSBzaW1wbGUgbW9iaWxlIGRldGVjdGlvbiwgbm90IDEwMCUgcmVsaWFibGVcbiAgICBzdGF0aWMgaXNNb2JpbGVEZXZpY2UoKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIHdpbmRvdy5vcmllbnRhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIikgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIklFTW9iaWxlXCIpICE9PSAtMSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBpc2lPU0RldmljZSgpIHtcbiAgICAgICAgcmV0dXJuIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pcChob25lfGFkfG9kKS9pKSAmJiAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGllbW9iaWxlKVtcXC9cXHNdPyhbXFx3XFwuXSopL2kpKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGlzQ29yZG92YSgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LlVSTC5pbmRleE9mKCdodHRwOi8vJykgPT09IC0xICYmIGRvY3VtZW50LlVSTC5pbmRleE9mKCdodHRwczovLycpID09PSAtMTtcbiAgICB9O1xufVxuIl19

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ElementRequest = (function () {
    function ElementRequest(txt) {
        this.txt = txt;
    }
    return ElementRequest;
}());
exports.ElementRequest = ElementRequest;


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var Subscription_1 = __webpack_require__(12);
var PromiseTrackerService = (function () {
    function PromiseTrackerService() {
        this.promiseList = [];
        this.delayJustFinished = false;
    }
    PromiseTrackerService.prototype.reset = function (options) {
        var _this = this;
        this.minDuration = options.minDuration;
        this.promiseList = [];
        options.promiseList.forEach(function (promise) {
            if (!promise || promise['busyFulfilled']) {
                return;
            }
            _this.addPromise(promise);
        });
        if (this.promiseList.length === 0) {
            return;
        }
        this.delayJustFinished = false;
        if (options.delay) {
            this.delayPromise = setTimeout(function () {
                _this.delayPromise = null;
                _this.delayJustFinished = true;
            }, options.delay);
        }
        if (options.minDuration) {
            this.durationPromise = setTimeout(function () {
                _this.durationPromise = null;
            }, options.minDuration + (options.delay || 0));
        }
    };
    PromiseTrackerService.prototype.addPromise = function (promise) {
        var _this = this;
        if (this.promiseList.indexOf(promise) !== -1) {
            return;
        }
        this.promiseList.push(promise);
        if (promise instanceof Promise) {
            promise.then.call(promise, function () { return _this.finishPromise(promise); }, function () { return _this.finishPromise(promise); });
        }
        else if (promise instanceof Subscription_1.Subscription) {
            promise.add(function () { return _this.finishPromise(promise); });
        }
    };
    PromiseTrackerService.prototype.finishPromise = function (promise) {
        promise['busyFulfilled'] = true;
        var index = this.promiseList.indexOf(promise);
        if (index === -1) {
            return;
        }
        this.promiseList.splice(index, 1);
    };
    PromiseTrackerService.prototype.isActive = function () {
        if (this.delayPromise) {
            return false;
        }
        if (!this.delayJustFinished) {
            if (this.durationPromise) {
                return true;
            }
            return this.promiseList.length > 0;
        }
        this.delayJustFinished = false;
        if (this.promiseList.length === 0) {
            this.durationPromise = null;
        }
        return this.promiseList.length > 0;
    };
    PromiseTrackerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PromiseTrackerService);
    return PromiseTrackerService;
}());
exports.PromiseTrackerService = PromiseTrackerService;
//# sourceMappingURL=promise-tracker.service.js.map

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(1);
var busy_config_1 = __webpack_require__(200);
var BusyService = (function () {
    function BusyService(config) {
        this.config = config || new busy_config_1.BusyConfig();
    }
    BusyService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [busy_config_1.BusyConfig])
    ], BusyService);
    return BusyService;
}());
exports.BusyService = BusyService;
//# sourceMappingURL=busy.service.js.map

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var BusyConfig = (function () {
    function BusyConfig(config) {
        if (config === void 0) { config = {}; }
        for (var option in exports.BUSY_CONFIG_DEFAULTS) {
            this[option] = config[option] != null ? config[option] : exports.BUSY_CONFIG_DEFAULTS[option];
        }
    }
    return BusyConfig;
}());
exports.BusyConfig = BusyConfig;
exports.BUSY_CONFIG_DEFAULTS = {
    template: "\n        <div class=\"ng-busy-default-wrapper\">\n            <div class=\"ng-busy-default-sign\">\n                <div class=\"ng-busy-default-spinner\">\n                    <div class=\"bar1\"></div>\n                    <div class=\"bar2\"></div>\n                    <div class=\"bar3\"></div>\n                    <div class=\"bar4\"></div>\n                    <div class=\"bar5\"></div>\n                    <div class=\"bar6\"></div>\n                    <div class=\"bar7\"></div>\n                    <div class=\"bar8\"></div>\n                    <div class=\"bar9\"></div>\n                    <div class=\"bar10\"></div>\n                    <div class=\"bar11\"></div>\n                    <div class=\"bar12\"></div>\n                </div>\n                <div class=\"ng-busy-default-text\">{{message}}</div>\n            </div>\n        </div>\n    ",
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'ng-busy'
};
//# sourceMappingURL=busy-config.js.map

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var Observable_1 = __webpack_require__(0);
var TimerObservable_1 = __webpack_require__(268);
var vg_states_1 = __webpack_require__(86);
var vg_api_1 = __webpack_require__(28);
var vg_events_1 = __webpack_require__(202);
var Subject_1 = __webpack_require__(5);
__webpack_require__(136);
__webpack_require__(286);
var VgMedia = (function () {
    function VgMedia(api, ref) {
        this.api = api;
        this.ref = ref;
        this.state = vg_states_1.VgStates.VG_PAUSED;
        this.time = { current: 0, total: 0, left: 0 };
        this.buffer = { end: 0 };
        this.canPlay = false;
        this.canPlayThrough = false;
        this.isBufferDetected = false;
        this.isMetadataLoaded = false;
        this.isReadyToPlay = false;
        this.isWaiting = false;
        this.isCompleted = false;
        this.isLive = false;
        this.checkInterval = 200;
        this.currentPlayPos = 0;
        this.lastPlayPos = 0;
        this.playAtferSync = false;
        this.bufferDetected = new Subject_1.Subject();
    }
    VgMedia.prototype.ngOnInit = function () {
        var _this = this;
        if (this.vgMedia.nodeName) {
            // It's a native element
            this.elem = this.vgMedia;
        }
        else {
            // It's an Angular Class
            this.elem = this.vgMedia.elem;
        }
        // Just in case we're creating this vgMedia dynamically register again into API
        this.api.registerMedia(this);
        this.subscriptions = {
            // Native events
            abort: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_ABORT),
            canPlay: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_CAN_PLAY),
            canPlayThrough: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_CAN_PLAY_THROUGH),
            durationChange: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_DURATION_CHANGE),
            emptied: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_EMPTIED),
            encrypted: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_ENCRYPTED),
            ended: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_ENDED),
            error: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_ERROR),
            loadedData: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_LOADED_DATA),
            loadedMetadata: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_LOADED_METADATA),
            loadStart: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_LOAD_START),
            pause: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_PAUSE),
            play: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_PLAY),
            playing: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_PLAYING),
            progress: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_PROGRESS),
            rateChange: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_RATE_CHANGE),
            seeked: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_SEEKED),
            seeking: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_SEEKING),
            stalled: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_STALLED),
            suspend: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_SUSPEND),
            timeUpdate: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_TIME_UPDATE),
            volumeChange: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_VOLUME_CHANGE),
            waiting: Observable_1.Observable.fromEvent(this.elem, vg_events_1.VgEvents.VG_WAITING),
            // Advertisement only events
            startAds: Observable_1.Observable.fromEvent(window, vg_events_1.VgEvents.VG_START_ADS),
            endAds: Observable_1.Observable.fromEvent(window, vg_events_1.VgEvents.VG_END_ADS),
            // See changes on <source> child elements to reload the video file
            mutation: Observable_1.Observable.create(function (observer) {
                var domObs = new MutationObserver(function (mutations) {
                    observer.next(mutations);
                });
                domObs.observe(_this.elem, { childList: true, attributes: true });
                return function () {
                    domObs.disconnect();
                };
            }),
            // Custom buffering detection
            bufferDetected: this.bufferDetected
        };
        this.mutationObs = this.subscriptions.mutation.subscribe(this.onMutation.bind(this));
        this.canPlayObs = this.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));
        this.canPlayThroughObs = this.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));
        this.loadedMetadataObs = this.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));
        this.waitingObs = this.subscriptions.waiting.subscribe(this.onWait.bind(this));
        this.progressObs = this.subscriptions.progress.subscribe(this.onProgress.bind(this));
        this.endedObs = this.subscriptions.ended.subscribe(this.onComplete.bind(this));
        this.playingObs = this.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));
        this.playObs = this.subscriptions.play.subscribe(this.onPlay.bind(this));
        this.pauseObs = this.subscriptions.pause.subscribe(this.onPause.bind(this));
        this.timeUpdateObs = this.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));
        this.volumeChangeObs = this.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));
        this.errorObs = this.subscriptions.error.subscribe(this.onError.bind(this));
        if (this.vgMaster) {
            this.api.playerReadyEvent.subscribe(function () {
                _this.prepareSync();
            });
        }
    };
    VgMedia.prototype.prepareSync = function () {
        var _this = this;
        var canPlayAll = [];
        for (var media in this.api.medias) {
            if (this.api.medias[media]) {
                canPlayAll.push(this.api.medias[media].subscriptions.canPlay);
            }
        }
        this.canPlayAllSubscription = Observable_1.Observable.combineLatest(canPlayAll, function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var allReady = params.some(function (event) { return event.target.readyState === 4; });
            if (allReady && !_this.syncSubscription) {
                _this.startSync();
                _this.syncSubscription.unsubscribe();
            }
        }).subscribe();
    };
    VgMedia.prototype.startSync = function () {
        var _this = this;
        this.syncSubscription = TimerObservable_1.TimerObservable.create(0, 1000).subscribe(function () {
            for (var media in _this.api.medias) {
                if (_this.api.medias[media] !== _this) {
                    var diff = _this.api.medias[media].currentTime - _this.currentTime;
                    if (diff < -0.3 || diff > 0.3) {
                        _this.playAtferSync = (_this.state === vg_states_1.VgStates.VG_PLAYING);
                        _this.pause();
                        _this.api.medias[media].pause();
                        _this.api.medias[media].currentTime = _this.currentTime;
                    }
                    else {
                        if (_this.playAtferSync) {
                            _this.play();
                            _this.api.medias[media].play();
                            _this.playAtferSync = false;
                        }
                    }
                }
            }
        });
    };
    VgMedia.prototype.onMutation = function (mutations) {
        // Detect changes only for source elements or src attribute
        for (var i = 0, l = mutations.length; i < l; i++) {
            var mut = mutations[i];
            if (mut.type === 'attributes' && mut.attributeName === 'src') {
                // Only load src file if it's not a blob (for DASH / HLS sources)
                if (mut.target['src'] && mut.target['src'].length > 0 && mut.target['src'].indexOf('blob:') < 0) {
                    this.loadMedia();
                    break;
                }
            }
            else if (mut.type === 'childList' && mut.removedNodes.length && mut.removedNodes[0].nodeName.toLowerCase() === 'source') {
                this.loadMedia();
                break;
            }
        }
    };
    VgMedia.prototype.loadMedia = function () {
        var _this = this;
        this.vgMedia.pause();
        this.vgMedia.currentTime = 0;
        // Start buffering until we can play the media file
        this.stopBufferCheck();
        this.isBufferDetected = true;
        this.bufferDetected.next(this.isBufferDetected);
        // TODO: This is ugly, we should find something cleaner. For some reason a TimerObservable doesn't works.
        setTimeout(function () { return _this.vgMedia.load(); }, 10);
    };
    VgMedia.prototype.play = function () {
        var _this = this;
        // short-circuit if already playing
        if (this.playPromise || (this.state !== vg_states_1.VgStates.VG_PAUSED && this.state !== vg_states_1.VgStates.VG_ENDED)) {
            return;
        }
        this.playPromise = this.vgMedia.play();
        // browser has async play promise
        if (this.playPromise && this.playPromise.then && this.playPromise.catch) {
            this.playPromise
                .then(function () {
                _this.playPromise = null;
            })
                .catch(function () {
                // deliberately empty for the sake of eating console noise
            });
        }
    };
    VgMedia.prototype.pause = function () {
        var _this = this;
        // browser has async play promise
        if (this.playPromise) {
            this.playPromise
                .then(function () {
                _this.vgMedia.pause();
            });
        }
        else {
            this.vgMedia.pause();
        }
    };
    Object.defineProperty(VgMedia.prototype, "id", {
        get: function () {
            // We should return undefined if vgMedia still doesn't exist
            var result = undefined;
            if (this.vgMedia) {
                result = this.vgMedia.id;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "duration", {
        get: function () {
            return this.vgMedia.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "currentTime", {
        get: function () {
            return this.vgMedia.currentTime;
        },
        set: function (seconds) {
            this.vgMedia.currentTime = seconds;
            // this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_SEEK));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "volume", {
        get: function () {
            return this.vgMedia.volume;
        },
        set: function (volume) {
            this.vgMedia.volume = volume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "playbackRate", {
        get: function () {
            return this.vgMedia.playbackRate;
        },
        set: function (rate) {
            this.vgMedia.playbackRate = rate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "buffered", {
        get: function () {
            return this.vgMedia.buffered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "textTracks", {
        get: function () {
            return this.vgMedia.textTracks;
        },
        enumerable: true,
        configurable: true
    });
    VgMedia.prototype.onCanPlay = function (event) {
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
        this.canPlay = true;
        this.ref.detectChanges();
    };
    VgMedia.prototype.onCanPlayThrough = function (event) {
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
        this.canPlayThrough = true;
        this.ref.detectChanges();
    };
    VgMedia.prototype.onLoadMetadata = function (event) {
        this.isMetadataLoaded = true;
        this.time = {
            current: 0,
            left: 0,
            total: this.duration * 1000
        };
        this.state = vg_states_1.VgStates.VG_PAUSED;
        // Live streaming check
        var t = Math.round(this.time.total);
        this.isLive = (t === Infinity);
        this.ref.detectChanges();
    };
    VgMedia.prototype.onWait = function (event) {
        this.isWaiting = true;
        this.ref.detectChanges();
    };
    VgMedia.prototype.onComplete = function (event) {
        this.isCompleted = true;
        this.state = vg_states_1.VgStates.VG_ENDED;
        this.ref.detectChanges();
    };
    VgMedia.prototype.onStartPlaying = function (event) {
        this.state = vg_states_1.VgStates.VG_PLAYING;
        this.ref.detectChanges();
    };
    VgMedia.prototype.onPlay = function (event) {
        this.state = vg_states_1.VgStates.VG_PLAYING;
        if (this.vgMaster) {
            if (!this.syncSubscription || this.syncSubscription.closed) {
                this.startSync();
            }
        }
        this.startBufferCheck();
        this.ref.detectChanges();
    };
    VgMedia.prototype.onPause = function (event) {
        this.state = vg_states_1.VgStates.VG_PAUSED;
        if (this.vgMaster) {
            if (!this.playAtferSync) {
                this.syncSubscription.unsubscribe();
            }
        }
        this.stopBufferCheck();
        this.ref.detectChanges();
    };
    VgMedia.prototype.onTimeUpdate = function (event) {
        var end = this.buffered.length - 1;
        this.time = {
            current: this.currentTime * 1000,
            total: this.time.total,
            left: (this.duration - this.currentTime) * 1000
        };
        if (end >= 0) {
            this.buffer = { end: this.buffered.end(end) * 1000 };
        }
        this.ref.detectChanges();
    };
    VgMedia.prototype.onProgress = function (event) {
        var end = this.buffered.length - 1;
        if (end >= 0) {
            this.buffer = { end: this.buffered.end(end) * 1000 };
        }
        this.ref.detectChanges();
    };
    VgMedia.prototype.onVolumeChange = function (event) {
        // TODO: Save to localstorage the current volume
        this.ref.detectChanges();
    };
    VgMedia.prototype.onError = function (event) {
        // TODO: Handle error messages
        this.ref.detectChanges();
    };
    // http://stackoverflow.com/a/23828241/779529
    // http://stackoverflow.com/a/23828241/779529
    VgMedia.prototype.bufferCheck = 
    // http://stackoverflow.com/a/23828241/779529
    function () {
        var offset = 1 / this.checkInterval;
        this.currentPlayPos = this.currentTime;
        if (!this.isBufferDetected && this.currentPlayPos < (this.lastPlayPos + offset)) {
            this.isBufferDetected = true;
        }
        if (this.isBufferDetected && this.currentPlayPos > (this.lastPlayPos + offset)) {
            this.isBufferDetected = false;
        }
        // Prevent calls to bufferCheck after ngOnDestroy have been called
        if (!this.bufferDetected.closed) {
            this.bufferDetected.next(this.isBufferDetected);
        }
        this.lastPlayPos = this.currentPlayPos;
    };
    VgMedia.prototype.startBufferCheck = function () {
        var _this = this;
        this.checkBufferSubscription = TimerObservable_1.TimerObservable.create(0, this.checkInterval).subscribe(function () {
            _this.bufferCheck();
        });
    };
    VgMedia.prototype.stopBufferCheck = function () {
        if (this.checkBufferSubscription) {
            this.checkBufferSubscription.unsubscribe();
        }
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
    };
    VgMedia.prototype.seekTime = function (value, byPercent) {
        if (byPercent === void 0) { byPercent = false; }
        var second;
        var duration = this.duration;
        if (byPercent) {
            second = value * duration / 100;
        }
        else {
            second = value;
        }
        this.currentTime = second;
    };
    VgMedia.prototype.addTextTrack = function (type, label, language, mode) {
        var newTrack = this.vgMedia.addTextTrack(type, label, language);
        if (mode) {
            newTrack.mode = mode;
        }
        return newTrack;
    };
    VgMedia.prototype.ngOnDestroy = function () {
        this.vgMedia.src = '';
        this.mutationObs.unsubscribe();
        this.canPlayObs.unsubscribe();
        this.canPlayThroughObs.unsubscribe();
        this.loadedMetadataObs.unsubscribe();
        this.waitingObs.unsubscribe();
        this.progressObs.unsubscribe();
        this.endedObs.unsubscribe();
        this.playingObs.unsubscribe();
        this.playObs.unsubscribe();
        this.pauseObs.unsubscribe();
        this.timeUpdateObs.unsubscribe();
        this.volumeChangeObs.unsubscribe();
        this.errorObs.unsubscribe();
        if (this.checkBufferSubscription) {
            this.checkBufferSubscription.unsubscribe();
        }
        if (this.syncSubscription) {
            this.syncSubscription.unsubscribe();
        }
        this.bufferDetected.complete();
        this.bufferDetected.unsubscribe();
        this.api.unregisterMedia(this);
    };
    VgMedia.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[vgMedia]'
                },] },
    ];
    /** @nocollapse */
    VgMedia.ctorParameters = function () { return [
        { type: vg_api_1.VgAPI, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    VgMedia.propDecorators = {
        "vgMedia": [{ type: core_1.Input },],
        "vgMaster": [{ type: core_1.Input },],
    };
    return VgMedia;
}());
exports.VgMedia = VgMedia;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctbWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1tZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUVuRyw4Q0FBNkM7QUFDN0MsbUVBQWtFO0FBR2xFLGlEQUErQztBQUMvQyw2Q0FBMkM7QUFDM0MsaURBQStDO0FBQy9DLHdDQUF1QztBQUV2Qyx5Q0FBdUM7QUFDdkMsNkNBQTJDOztJQXNEdkMsaUJBQW9CLEdBQVUsRUFBVSxHQUFzQjtRQUExQyxRQUFHLEdBQUgsR0FBRyxDQUFPO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7cUJBM0M5QyxvQkFBUSxDQUFDLFNBQVM7b0JBRXRCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7c0JBQy9CLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTt1QkFHTCxLQUFLOzhCQUNFLEtBQUs7Z0NBQ0gsS0FBSztnQ0FDTCxLQUFLOzZCQUNSLEtBQUs7eUJBQ1QsS0FBSzsyQkFDSCxLQUFLO3NCQUNWLEtBQUs7NkJBR0MsR0FBRzs4QkFDRixDQUFDOzJCQUNKLENBQUM7NkJBS0UsS0FBSzs4QkFnQkssSUFBSSxpQkFBTyxFQUFFO0tBTS9DO0lBRUQsMEJBQVEsR0FBUjtRQUFBLGlCQW1GQztRQWxGRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBRXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUM1QjtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDakM7O1FBR0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLGFBQWEsR0FBRzs7WUFFakIsS0FB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Z0IsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWxDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDOztnQkFsZkosZ0JBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsV0FBVztpQkFDeEI7Ozs7Z0JBVFEsY0FBSztnQkFQTCx3QkFBaUI7Ozs0QkFvQnJCLFlBQUs7NkJBQ0wsWUFBSzs7a0JBckJWOztBQWlCYSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBPbkluaXQsIERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJUGxheWFibGUsIElNZWRpYVN1YnNjcmlwdGlvbnMgfSBmcm9tIFwiLi9pLXBsYXlhYmxlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgVGltZXJPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvb2JzZXJ2YWJsZS9UaW1lck9ic2VydmFibGVcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzL1N1YnNjcmlwdGlvblwiO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tIFwicnhqcy9PYnNlcnZlclwiO1xuaW1wb3J0IHsgVmdTdGF0ZXMgfSBmcm9tICcuLi9zdGF0ZXMvdmctc3RhdGVzJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IFZnRXZlbnRzIH0gZnJvbSAnLi4vZXZlbnRzL3ZnLWV2ZW50cyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvY29tYmluZUxhdGVzdCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3ZnTWVkaWFdJ1xufSlcbmV4cG9ydCBjbGFzcyBWZ01lZGlhIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIElQbGF5YWJsZSB7XG4gICAgZWxlbTogYW55O1xuXG4gICAgQElucHV0KCkgdmdNZWRpYTogYW55O1xuICAgIEBJbnB1dCgpIHZnTWFzdGVyOiBib29sZWFuO1xuXG4gICAgc3RhdGU6IHN0cmluZyA9IFZnU3RhdGVzLlZHX1BBVVNFRDtcblxuICAgIHRpbWU6IGFueSA9IHsgY3VycmVudDogMCwgdG90YWw6IDAsIGxlZnQ6IDAgfTtcbiAgICBidWZmZXI6IGFueSA9IHsgZW5kOiAwIH07XG4gICAgc3Vic2NyaXB0aW9uczogSU1lZGlhU3Vic2NyaXB0aW9ucyB8IGFueTtcblxuICAgIGNhblBsYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjYW5QbGF5VGhyb3VnaDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzQnVmZmVyRGV0ZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01ldGFkYXRhTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNSZWFkeVRvUGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzV2FpdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNMaXZlOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNoZWNrSW50ZXJ2YWw6IG51bWJlciA9IDIwMDtcbiAgICBjdXJyZW50UGxheVBvczogbnVtYmVyID0gMDtcbiAgICBsYXN0UGxheVBvczogbnVtYmVyID0gMDtcblxuICAgIGNoZWNrQnVmZmVyU3Vic2NyaXB0aW9uOiBhbnk7XG4gICAgc3luY1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGNhblBsYXlBbGxTdWJzY3JpcHRpb246IGFueTtcbiAgICBwbGF5QXRmZXJTeW5jOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBtdXRhdGlvbk9iczogU3Vic2NyaXB0aW9uO1xuICAgIGNhblBsYXlPYnM6IFN1YnNjcmlwdGlvbjtcbiAgICBjYW5QbGF5VGhyb3VnaE9iczogU3Vic2NyaXB0aW9uO1xuICAgIGxvYWRlZE1ldGFkYXRhT2JzOiBTdWJzY3JpcHRpb247XG4gICAgd2FpdGluZ09iczogU3Vic2NyaXB0aW9uO1xuICAgIHByb2dyZXNzT2JzOiBTdWJzY3JpcHRpb247XG4gICAgZW5kZWRPYnM6IFN1YnNjcmlwdGlvbjtcbiAgICBwbGF5aW5nT2JzOiBTdWJzY3JpcHRpb247XG4gICAgcGxheU9iczogU3Vic2NyaXB0aW9uO1xuICAgIHBhdXNlT2JzOiBTdWJzY3JpcHRpb247XG4gICAgdGltZVVwZGF0ZU9iczogU3Vic2NyaXB0aW9uO1xuICAgIHZvbHVtZUNoYW5nZU9iczogU3Vic2NyaXB0aW9uO1xuICAgIGVycm9yT2JzOiBTdWJzY3JpcHRpb247XG5cbiAgICBidWZmZXJEZXRlY3RlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwbGF5UHJvbWlzZTogUHJvbWlzZTxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IFZnQVBJLCBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy52Z01lZGlhLm5vZGVOYW1lKSB7XG4gICAgICAgICAgICAvLyBJdCdzIGEgbmF0aXZlIGVsZW1lbnRcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHRoaXMudmdNZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0J3MgYW4gQW5ndWxhciBDbGFzc1xuICAgICAgICAgICAgdGhpcy5lbGVtID0gdGhpcy52Z01lZGlhLmVsZW07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBKdXN0IGluIGNhc2Ugd2UncmUgY3JlYXRpbmcgdGhpcyB2Z01lZGlhIGR5bmFtaWNhbGx5IHJlZ2lzdGVyIGFnYWluIGludG8gQVBJXG4gICAgICAgIHRoaXMuYXBpLnJlZ2lzdGVyTWVkaWEodGhpcyk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0ge1xuICAgICAgICAgICAgLy8gTmF0aXZlIGV2ZW50c1xuICAgICAgICAgICAgYWJvcnQ6IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19BQk9SVCksXG4gICAgICAgICAgICBjYW5QbGF5OiBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfQ0FOX1BMQVkpLFxuICAgICAgICAgICAgY2FuUGxheVRocm91Z2g6IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19DQU5fUExBWV9USFJPVUdIKSxcbiAgICAgICAgICAgIGR1cmF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfRFVSQVRJT05fQ0hBTkdFKSxcbiAgICAgICAgICAgIGVtcHRpZWQ6IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19FTVBUSUVEKSxcbiAgICAgICAgICAgIGVuY3J5cHRlZDogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX0VOQ1JZUFRFRCksXG4gICAgICAgICAgICBlbmRlZDogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX0VOREVEKSxcbiAgICAgICAgICAgIGVycm9yOiBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfRVJST1IpLFxuICAgICAgICAgICAgbG9hZGVkRGF0YTogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX0xPQURFRF9EQVRBKSxcbiAgICAgICAgICAgIGxvYWRlZE1ldGFkYXRhOiBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfTE9BREVEX01FVEFEQVRBKSxcbiAgICAgICAgICAgIGxvYWRTdGFydDogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX0xPQURfU1RBUlQpLFxuICAgICAgICAgICAgcGF1c2U6IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19QQVVTRSksXG4gICAgICAgICAgICBwbGF5OiBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfUExBWSksXG4gICAgICAgICAgICBwbGF5aW5nOiBPYnNlcnZhYmxlLmZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfUExBWUlORyksXG4gICAgICAgICAgICBwcm9ncmVzczogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1BST0dSRVNTKSxcbiAgICAgICAgICAgIHJhdGVDaGFuZ2U6IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19SQVRFX0NIQU5HRSksXG4gICAgICAgICAgICBzZWVrZWQ6IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19TRUVLRUQpLFxuICAgICAgICAgICAgc2Vla2luZzogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1NFRUtJTkcpLFxuICAgICAgICAgICAgc3RhbGxlZDogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1NUQUxMRUQpLFxuICAgICAgICAgICAgc3VzcGVuZDogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1NVU1BFTkQpLFxuICAgICAgICAgICAgdGltZVVwZGF0ZTogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1RJTUVfVVBEQVRFKSxcbiAgICAgICAgICAgIHZvbHVtZUNoYW5nZTogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1ZPTFVNRV9DSEFOR0UpLFxuICAgICAgICAgICAgd2FpdGluZzogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1dBSVRJTkcpLFxuXG4gICAgICAgICAgICAvLyBBZHZlcnRpc2VtZW50IG9ubHkgZXZlbnRzXG4gICAgICAgICAgICBzdGFydEFkczogT2JzZXJ2YWJsZS5mcm9tRXZlbnQoPGFueT53aW5kb3csIFZnRXZlbnRzLlZHX1NUQVJUX0FEUyksXG4gICAgICAgICAgICBlbmRBZHM6IE9ic2VydmFibGUuZnJvbUV2ZW50KDxhbnk+d2luZG93LCBWZ0V2ZW50cy5WR19FTkRfQURTKSxcblxuICAgICAgICAgICAgLy8gU2VlIGNoYW5nZXMgb24gPHNvdXJjZT4gY2hpbGQgZWxlbWVudHMgdG8gcmVsb2FkIHRoZSB2aWRlbyBmaWxlXG4gICAgICAgICAgICBtdXRhdGlvbjogT2JzZXJ2YWJsZS5jcmVhdGUoXG4gICAgICAgICAgICAgICAgKG9ic2VydmVyOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZG9tT2JzID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChtdXRhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBkb21PYnMub2JzZXJ2ZSg8YW55PnRoaXMuZWxlbSwgeyBjaGlsZExpc3Q6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWUgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbU9icy5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSxcblxuICAgICAgICAgICAgLy8gQ3VzdG9tIGJ1ZmZlcmluZyBkZXRlY3Rpb25cbiAgICAgICAgICAgIGJ1ZmZlckRldGVjdGVkOiB0aGlzLmJ1ZmZlckRldGVjdGVkXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tdXRhdGlvbk9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5tdXRhdGlvbi5zdWJzY3JpYmUodGhpcy5vbk11dGF0aW9uLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNhblBsYXlPYnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMuY2FuUGxheS5zdWJzY3JpYmUodGhpcy5vbkNhblBsYXkuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY2FuUGxheVRocm91Z2hPYnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMuY2FuUGxheVRocm91Z2guc3Vic2NyaWJlKHRoaXMub25DYW5QbGF5VGhyb3VnaC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkZWRNZXRhZGF0YU9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5sb2FkZWRNZXRhZGF0YS5zdWJzY3JpYmUodGhpcy5vbkxvYWRNZXRhZGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy53YWl0aW5nT2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLndhaXRpbmcuc3Vic2NyaWJlKHRoaXMub25XYWl0LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnByb2dyZXNzT2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLnByb2dyZXNzLnN1YnNjcmliZSh0aGlzLm9uUHJvZ3Jlc3MuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuZW5kZWRPYnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMuZW5kZWQuc3Vic2NyaWJlKHRoaXMub25Db21wbGV0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5wbGF5aW5nT2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLnBsYXlpbmcuc3Vic2NyaWJlKHRoaXMub25TdGFydFBsYXlpbmcuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMucGxheU9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5wbGF5LnN1YnNjcmliZSh0aGlzLm9uUGxheS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5wYXVzZU9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5wYXVzZS5zdWJzY3JpYmUodGhpcy5vblBhdXNlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnRpbWVVcGRhdGVPYnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMudGltZVVwZGF0ZS5zdWJzY3JpYmUodGhpcy5vblRpbWVVcGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudm9sdW1lQ2hhbmdlT2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLnZvbHVtZUNoYW5nZS5zdWJzY3JpYmUodGhpcy5vblZvbHVtZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5lcnJvck9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5lcnJvci5zdWJzY3JpYmUodGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGlmICh0aGlzLnZnTWFzdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwaS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZVN5bmMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJlcGFyZVN5bmMoKSB7XG4gICAgICAgIGxldCBjYW5QbGF5QWxsOiBBcnJheTxPYnNlcnZhYmxlPGFueT4+ID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgbWVkaWEgaW4gdGhpcy5hcGkubWVkaWFzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcGkubWVkaWFzWyBtZWRpYSBdKSB7XG4gICAgICAgICAgICAgICAgY2FuUGxheUFsbC5wdXNoKHRoaXMuYXBpLm1lZGlhc1sgbWVkaWEgXS5zdWJzY3JpcHRpb25zLmNhblBsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW5QbGF5QWxsU3Vic2NyaXB0aW9uID0gT2JzZXJ2YWJsZS5jb21iaW5lTGF0ZXN0KGNhblBsYXlBbGwsXG4gICAgICAgICAgICAoLi4ucGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFsbFJlYWR5OiBib29sZWFuID0gcGFyYW1zLnNvbWUoZXZlbnQgPT4gZXZlbnQudGFyZ2V0LnJlYWR5U3RhdGUgPT09IDQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFsbFJlYWR5ICYmICF0aGlzLnN5bmNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFN5bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHN0YXJ0U3luYygpIHtcbiAgICAgICAgdGhpcy5zeW5jU3Vic2NyaXB0aW9uID0gVGltZXJPYnNlcnZhYmxlLmNyZWF0ZSgwLCAxMDAwKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbWVkaWEgaW4gdGhpcy5hcGkubWVkaWFzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0gIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZmOiBudW1iZXIgPSB0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0uY3VycmVudFRpbWUgLSB0aGlzLmN1cnJlbnRUaW1lO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZiA8IC0wLjMgfHwgZGlmZiA+IDAuMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUF0ZmVyU3luYyA9ICh0aGlzLnN0YXRlID09PSBWZ1N0YXRlcy5WR19QTEFZSU5HKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0uY3VycmVudFRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheUF0ZmVyU3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkubWVkaWFzWyBtZWRpYSBdLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QXRmZXJTeW5jID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uTXV0YXRpb24obXV0YXRpb25zOiBBcnJheTxNdXRhdGlvblJlY29yZD4pIHtcbiAgICAgICAgLy8gRGV0ZWN0IGNoYW5nZXMgb25seSBmb3Igc291cmNlIGVsZW1lbnRzIG9yIHNyYyBhdHRyaWJ1dGVcbiAgICAgICAgZm9yIChsZXQgaT0wLCBsPW11dGF0aW9ucy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbXV0OiBNdXRhdGlvblJlY29yZCA9IG11dGF0aW9uc1tpXTtcblxuICAgICAgICAgICAgaWYgKG11dC50eXBlID09PSAnYXR0cmlidXRlcycgJiYgbXV0LmF0dHJpYnV0ZU5hbWUgPT09ICdzcmMnKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBsb2FkIHNyYyBmaWxlIGlmIGl0J3Mgbm90IGEgYmxvYiAoZm9yIERBU0ggLyBITFMgc291cmNlcylcbiAgICAgICAgICAgICAgICBpZiAobXV0LnRhcmdldFsnc3JjJ10gJiYgbXV0LnRhcmdldFsnc3JjJ10ubGVuZ3RoID4gMCAmJiBtdXQudGFyZ2V0WydzcmMnXS5pbmRleE9mKCdibG9iOicpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZWRpYSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG11dC50eXBlID09PSAnY2hpbGRMaXN0JyAmJiBtdXQucmVtb3ZlZE5vZGVzLmxlbmd0aCAmJiBtdXQucmVtb3ZlZE5vZGVzWzBdLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzb3VyY2UnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTWVkaWEoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRNZWRpYSgpIHtcbiAgICAgICAgdGhpcy52Z01lZGlhLnBhdXNlKCk7XG4gICAgICAgIHRoaXMudmdNZWRpYS5jdXJyZW50VGltZSA9IDA7XG5cbiAgICAgICAgLy8gU3RhcnQgYnVmZmVyaW5nIHVudGlsIHdlIGNhbiBwbGF5IHRoZSBtZWRpYSBmaWxlXG4gICAgICAgIHRoaXMuc3RvcEJ1ZmZlckNoZWNrKCk7XG4gICAgICAgIHRoaXMuaXNCdWZmZXJEZXRlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYnVmZmVyRGV0ZWN0ZWQubmV4dCh0aGlzLmlzQnVmZmVyRGV0ZWN0ZWQpO1xuXG4gICAgICAgIC8vIFRPRE86IFRoaXMgaXMgdWdseSwgd2Ugc2hvdWxkIGZpbmQgc29tZXRoaW5nIGNsZWFuZXIuIEZvciBzb21lIHJlYXNvbiBhIFRpbWVyT2JzZXJ2YWJsZSBkb2Vzbid0IHdvcmtzLlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudmdNZWRpYS5sb2FkKCksIDEwKTtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICAvLyBzaG9ydC1jaXJjdWl0IGlmIGFscmVhZHkgcGxheWluZ1xuICAgICAgICBpZiAodGhpcy5wbGF5UHJvbWlzZSB8fCAodGhpcy5zdGF0ZSAhPT0gVmdTdGF0ZXMuVkdfUEFVU0VEICYmIHRoaXMuc3RhdGUgIT09IFZnU3RhdGVzLlZHX0VOREVEKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wbGF5UHJvbWlzZSA9IHRoaXMudmdNZWRpYS5wbGF5KCk7XG5cbiAgICAgICAgLy8gYnJvd3NlciBoYXMgYXN5bmMgcGxheSBwcm9taXNlXG4gICAgICAgIGlmICh0aGlzLnBsYXlQcm9taXNlICYmIHRoaXMucGxheVByb21pc2UudGhlbiAmJiB0aGlzLnBsYXlQcm9taXNlLmNhdGNoKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlQcm9taXNlXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlQcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlbGliZXJhdGVseSBlbXB0eSBmb3IgdGhlIHNha2Ugb2YgZWF0aW5nIGNvbnNvbGUgbm9pc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICAvLyBicm93c2VyIGhhcyBhc3luYyBwbGF5IHByb21pc2VcbiAgICAgICAgaWYgKHRoaXMucGxheVByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVByb21pc2VcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmdNZWRpYS5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52Z01lZGlhLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIC8vIFdlIHNob3VsZCByZXR1cm4gdW5kZWZpbmVkIGlmIHZnTWVkaWEgc3RpbGwgZG9lc24ndCBleGlzdFxuICAgICAgICBsZXQgcmVzdWx0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLnZnTWVkaWEpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMudmdNZWRpYS5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZ2V0IGR1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52Z01lZGlhLmR1cmF0aW9uO1xuICAgIH1cblxuICAgIHNldCBjdXJyZW50VGltZShzZWNvbmRzKSB7XG4gICAgICAgIHRoaXMudmdNZWRpYS5jdXJyZW50VGltZSA9IHNlY29uZHM7XG4gICAgICAgIC8vIHRoaXMuZWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChWZ0V2ZW50cy5WR19TRUVLKSk7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRUaW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52Z01lZGlhLmN1cnJlbnRUaW1lO1xuICAgIH1cblxuICAgIHNldCB2b2x1bWUodm9sdW1lKSB7XG4gICAgICAgIHRoaXMudmdNZWRpYS52b2x1bWUgPSB2b2x1bWU7XG4gICAgfVxuXG4gICAgZ2V0IHZvbHVtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmdNZWRpYS52b2x1bWU7XG4gICAgfVxuXG4gICAgc2V0IHBsYXliYWNrUmF0ZShyYXRlKSB7XG4gICAgICAgIHRoaXMudmdNZWRpYS5wbGF5YmFja1JhdGUgPSByYXRlO1xuICAgIH1cblxuICAgIGdldCBwbGF5YmFja1JhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZnTWVkaWEucGxheWJhY2tSYXRlO1xuICAgIH1cblxuICAgIGdldCBidWZmZXJlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmdNZWRpYS5idWZmZXJlZDtcbiAgICB9XG5cbiAgICBnZXQgdGV4dFRyYWNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmdNZWRpYS50ZXh0VHJhY2tzO1xuICAgIH1cblxuICAgIG9uQ2FuUGxheShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuaXNCdWZmZXJEZXRlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ1ZmZlckRldGVjdGVkLm5leHQodGhpcy5pc0J1ZmZlckRldGVjdGVkKTtcbiAgICAgICAgdGhpcy5jYW5QbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG9uQ2FuUGxheVRocm91Z2goZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmlzQnVmZmVyRGV0ZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idWZmZXJEZXRlY3RlZC5uZXh0KHRoaXMuaXNCdWZmZXJEZXRlY3RlZCk7XG4gICAgICAgIHRoaXMuY2FuUGxheVRocm91Z2ggPSB0cnVlO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25Mb2FkTWV0YWRhdGEoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmlzTWV0YWRhdGFMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudGltZSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdG90YWw6IHRoaXMuZHVyYXRpb24gKiAxMDAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IFZnU3RhdGVzLlZHX1BBVVNFRDtcblxuICAgICAgICAvLyBMaXZlIHN0cmVhbWluZyBjaGVja1xuICAgICAgICBsZXQgdDpudW1iZXIgPSBNYXRoLnJvdW5kKHRoaXMudGltZS50b3RhbCk7XG4gICAgICAgIHRoaXMuaXNMaXZlID0gKHQgPT09IEluZmluaXR5KTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG9uV2FpdChldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuaXNXYWl0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG9uQ29tcGxldGUoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFZnU3RhdGVzLlZHX0VOREVEO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25TdGFydFBsYXlpbmcoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gVmdTdGF0ZXMuVkdfUExBWUlORztcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG9uUGxheShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBWZ1N0YXRlcy5WR19QTEFZSU5HO1xuXG4gICAgICAgIGlmICh0aGlzLnZnTWFzdGVyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3luY1N1YnNjcmlwdGlvbiB8fCB0aGlzLnN5bmNTdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhcnRCdWZmZXJDaGVjaygpO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25QYXVzZShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBWZ1N0YXRlcy5WR19QQVVTRUQ7XG5cbiAgICAgICAgaWYgKHRoaXMudmdNYXN0ZXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGF5QXRmZXJTeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0b3BCdWZmZXJDaGVjaygpO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25UaW1lVXBkYXRlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IGVuZCA9IHRoaXMuYnVmZmVyZWQubGVuZ3RoIC0gMTtcblxuICAgICAgICB0aGlzLnRpbWUgPSB7XG4gICAgICAgICAgICBjdXJyZW50OiB0aGlzLmN1cnJlbnRUaW1lICogMTAwMCxcbiAgICAgICAgICAgIHRvdGFsOiB0aGlzLnRpbWUudG90YWwsXG4gICAgICAgICAgICBsZWZ0OiAodGhpcy5kdXJhdGlvbiAtIHRoaXMuY3VycmVudFRpbWUpICogMTAwMFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChlbmQgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5idWZmZXIgPSB7IGVuZDogdGhpcy5idWZmZXJlZC5lbmQoZW5kKSAqIDEwMDAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25Qcm9ncmVzcyhldmVudDogYW55KSB7XG4gICAgICAgIGxldCBlbmQgPSB0aGlzLmJ1ZmZlcmVkLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgaWYgKGVuZCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IHsgZW5kOiB0aGlzLmJ1ZmZlcmVkLmVuZChlbmQpICogMTAwMCB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvblZvbHVtZUNoYW5nZShldmVudDogYW55KSB7XG4gICAgICAgIC8vIFRPRE86IFNhdmUgdG8gbG9jYWxzdG9yYWdlIHRoZSBjdXJyZW50IHZvbHVtZVxuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgb25FcnJvcihldmVudDogYW55KSB7XG4gICAgICAgIC8vIFRPRE86IEhhbmRsZSBlcnJvciBtZXNzYWdlc1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjM4MjgyNDEvNzc5NTI5XG4gICAgYnVmZmVyQ2hlY2soKSB7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IDEgLyB0aGlzLmNoZWNrSW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuY3VycmVudFBsYXlQb3MgPSB0aGlzLmN1cnJlbnRUaW1lO1xuXG4gICAgICAgIGlmICghdGhpcy5pc0J1ZmZlckRldGVjdGVkICYmIHRoaXMuY3VycmVudFBsYXlQb3MgPCAodGhpcy5sYXN0UGxheVBvcyArIG9mZnNldCkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCdWZmZXJEZXRlY3RlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0J1ZmZlckRldGVjdGVkICYmIHRoaXMuY3VycmVudFBsYXlQb3MgPiAodGhpcy5sYXN0UGxheVBvcyArIG9mZnNldCkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCdWZmZXJEZXRlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJldmVudCBjYWxscyB0byBidWZmZXJDaGVjayBhZnRlciBuZ09uRGVzdHJveSBoYXZlIGJlZW4gY2FsbGVkXG4gICAgICAgIGlmICghdGhpcy5idWZmZXJEZXRlY3RlZC5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyRGV0ZWN0ZWQubmV4dCh0aGlzLmlzQnVmZmVyRGV0ZWN0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0UGxheVBvcyA9IHRoaXMuY3VycmVudFBsYXlQb3M7XG4gICAgfVxuXG4gICAgc3RhcnRCdWZmZXJDaGVjaygpIHtcbiAgICAgICAgdGhpcy5jaGVja0J1ZmZlclN1YnNjcmlwdGlvbiA9IFRpbWVyT2JzZXJ2YWJsZS5jcmVhdGUoMCwgdGhpcy5jaGVja0ludGVydmFsKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0b3BCdWZmZXJDaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tCdWZmZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tCdWZmZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNCdWZmZXJEZXRlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuYnVmZmVyRGV0ZWN0ZWQubmV4dCh0aGlzLmlzQnVmZmVyRGV0ZWN0ZWQpO1xuICAgIH1cblxuICAgIHNlZWtUaW1lKHZhbHVlOm51bWJlciwgYnlQZXJjZW50OmJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgc2Vjb25kOm51bWJlcjtcbiAgICAgICAgbGV0IGR1cmF0aW9uOm51bWJlciA9IHRoaXMuZHVyYXRpb247XG5cbiAgICAgICAgaWYgKGJ5UGVyY2VudCkge1xuICAgICAgICAgICAgc2Vjb25kID0gdmFsdWUgKiBkdXJhdGlvbiAvIDEwMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlY29uZCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IHNlY29uZDtcbiAgICB9XG5cbiAgICBhZGRUZXh0VHJhY2sodHlwZTpzdHJpbmcsIGxhYmVsPzpzdHJpbmcsIGxhbmd1YWdlPzpzdHJpbmcsIG1vZGU/OidkaXNhYmxlZCcgfCAnaGlkZGVuJyB8ICdzaG93aW5nJyk6IFRleHRUcmFjayB7XG4gICAgICAgIGNvbnN0IG5ld1RyYWNrOlRleHRUcmFjayA9IHRoaXMudmdNZWRpYS5hZGRUZXh0VHJhY2sodHlwZSwgbGFiZWwsIGxhbmd1YWdlKTtcblxuICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgbmV3VHJhY2subW9kZSA9IG1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1RyYWNrO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnZnTWVkaWEuc3JjID0gJyc7XG4gICAgICAgIHRoaXMubXV0YXRpb25PYnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jYW5QbGF5T2JzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2FuUGxheVRocm91Z2hPYnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5sb2FkZWRNZXRhZGF0YU9icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLndhaXRpbmdPYnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzc09icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmVuZGVkT2JzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMucGxheWluZ09icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnBsYXlPYnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5wYXVzZU9icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnRpbWVVcGRhdGVPYnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52b2x1bWVDaGFuZ2VPYnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5lcnJvck9icy51bnN1YnNjcmliZSgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tCdWZmZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tCdWZmZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuc3luY1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zeW5jU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnVmZmVyRGV0ZWN0ZWQuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5idWZmZXJEZXRlY3RlZC51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIHRoaXMuYXBpLnVucmVnaXN0ZXJNZWRpYSh0aGlzKTtcbiAgICB9XG59XG4iXX0=

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var VgEvents = (function () {
    function VgEvents() {
    }
    VgEvents.VG_ABORT = 'abort';
    VgEvents.VG_CAN_PLAY = 'canplay';
    VgEvents.VG_CAN_PLAY_THROUGH = 'canplaythrough';
    VgEvents.VG_DURATION_CHANGE = 'durationchange';
    VgEvents.VG_EMPTIED = 'emptied';
    VgEvents.VG_ENCRYPTED = 'encrypted';
    VgEvents.VG_ENDED = 'ended';
    VgEvents.VG_ERROR = 'error';
    VgEvents.VG_LOADED_DATA = 'loadeddata';
    VgEvents.VG_LOADED_METADATA = 'loadedmetadata';
    VgEvents.VG_LOAD_START = 'loadstart';
    VgEvents.VG_PAUSE = 'pause';
    VgEvents.VG_PLAY = 'play';
    VgEvents.VG_PLAYING = 'playing';
    VgEvents.VG_PROGRESS = 'progress';
    VgEvents.VG_RATE_CHANGE = 'ratechange';
    VgEvents.VG_SEEK = 'seek';
    VgEvents.VG_SEEKED = 'seeked';
    VgEvents.VG_SEEKING = 'seeking';
    VgEvents.VG_STALLED = 'stalled';
    VgEvents.VG_SUSPEND = 'suspend';
    VgEvents.VG_TIME_UPDATE = 'timeupdate';
    VgEvents.VG_VOLUME_CHANGE = 'volumechange';
    VgEvents.VG_WAITING = 'waiting';
    VgEvents.VG_LOAD = 'load';
    VgEvents.VG_ENTER = 'enter';
    VgEvents.VG_EXIT = 'exit';
    VgEvents.VG_START_ADS = 'startads';
    VgEvents.VG_END_ADS = 'endads';
    VgEvents.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    VgEvents.ctorParameters = function () { return []; };
    return VgEvents;
}());
exports.VgEvents = VgEvents;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDOzs7O3dCQUlYLE9BQU87MkJBQ0osU0FBUzttQ0FDRCxnQkFBZ0I7a0NBQ2pCLGdCQUFnQjswQkFDeEIsU0FBUzs0QkFDUCxXQUFXO3dCQUNmLE9BQU87d0JBQ1AsT0FBTzs4QkFDRCxZQUFZO2tDQUNSLGdCQUFnQjs2QkFDckIsV0FBVzt3QkFDaEIsT0FBTzt1QkFDUixNQUFNOzBCQUNILFNBQVM7MkJBQ1IsVUFBVTs4QkFDUCxZQUFZO3VCQUNuQixNQUFNO3lCQUNKLFFBQVE7MEJBQ1AsU0FBUzswQkFDVCxTQUFTOzBCQUNULFNBQVM7OEJBQ0wsWUFBWTtnQ0FDVixjQUFjOzBCQUNwQixTQUFTO3VCQUVaLE1BQU07d0JBQ0wsT0FBTzt1QkFDUixNQUFNOzRCQUVELFVBQVU7MEJBQ1osUUFBUTs7Z0JBaEN2QyxpQkFBVTs7OzttQkFGWDs7QUFHYSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZ0V2ZW50cyB7XG4gICAgc3RhdGljIFZHX0FCT1JUOiBzdHJpbmcgPSAnYWJvcnQnO1xuICAgIHN0YXRpYyBWR19DQU5fUExBWTogc3RyaW5nID0gJ2NhbnBsYXknO1xuICAgIHN0YXRpYyBWR19DQU5fUExBWV9USFJPVUdIOiBzdHJpbmcgPSAnY2FucGxheXRocm91Z2gnO1xuICAgIHN0YXRpYyBWR19EVVJBVElPTl9DSEFOR0U6IHN0cmluZyA9ICdkdXJhdGlvbmNoYW5nZSc7XG4gICAgc3RhdGljIFZHX0VNUFRJRUQ6IHN0cmluZyA9ICdlbXB0aWVkJztcbiAgICBzdGF0aWMgVkdfRU5DUllQVEVEOiBzdHJpbmcgPSAnZW5jcnlwdGVkJztcbiAgICBzdGF0aWMgVkdfRU5ERUQ6IHN0cmluZyA9ICdlbmRlZCc7XG4gICAgc3RhdGljIFZHX0VSUk9SOiBzdHJpbmcgPSAnZXJyb3InO1xuICAgIHN0YXRpYyBWR19MT0FERURfREFUQTogc3RyaW5nID0gJ2xvYWRlZGRhdGEnO1xuICAgIHN0YXRpYyBWR19MT0FERURfTUVUQURBVEE6IHN0cmluZyA9ICdsb2FkZWRtZXRhZGF0YSc7XG4gICAgc3RhdGljIFZHX0xPQURfU1RBUlQ6IHN0cmluZyA9ICdsb2Fkc3RhcnQnO1xuICAgIHN0YXRpYyBWR19QQVVTRTogc3RyaW5nID0gJ3BhdXNlJztcbiAgICBzdGF0aWMgVkdfUExBWTogc3RyaW5nID0gJ3BsYXknO1xuICAgIHN0YXRpYyBWR19QTEFZSU5HOiBzdHJpbmcgPSAncGxheWluZyc7XG4gICAgc3RhdGljIFZHX1BST0dSRVNTOiBzdHJpbmcgPSAncHJvZ3Jlc3MnO1xuICAgIHN0YXRpYyBWR19SQVRFX0NIQU5HRTogc3RyaW5nID0gJ3JhdGVjaGFuZ2UnO1xuICAgIHN0YXRpYyBWR19TRUVLOiBzdHJpbmcgPSAnc2Vlayc7XG4gICAgc3RhdGljIFZHX1NFRUtFRDogc3RyaW5nID0gJ3NlZWtlZCc7XG4gICAgc3RhdGljIFZHX1NFRUtJTkc6IHN0cmluZyA9ICdzZWVraW5nJztcbiAgICBzdGF0aWMgVkdfU1RBTExFRDogc3RyaW5nID0gJ3N0YWxsZWQnO1xuICAgIHN0YXRpYyBWR19TVVNQRU5EOiBzdHJpbmcgPSAnc3VzcGVuZCc7XG4gICAgc3RhdGljIFZHX1RJTUVfVVBEQVRFOiBzdHJpbmcgPSAndGltZXVwZGF0ZSc7XG4gICAgc3RhdGljIFZHX1ZPTFVNRV9DSEFOR0U6IHN0cmluZyA9ICd2b2x1bWVjaGFuZ2UnO1xuICAgIHN0YXRpYyBWR19XQUlUSU5HOiBzdHJpbmcgPSAnd2FpdGluZyc7XG4gICAgXG4gICAgc3RhdGljIFZHX0xPQUQ6IHN0cmluZyA9ICdsb2FkJztcbiAgICBzdGF0aWMgVkdfRU5URVI6IHN0cmluZyA9ICdlbnRlcic7XG4gICAgc3RhdGljIFZHX0VYSVQ6IHN0cmluZyA9ICdleGl0JztcblxuICAgIHN0YXRpYyBWR19TVEFSVF9BRFM6IHN0cmluZyA9ICdzdGFydGFkcyc7XG4gICAgc3RhdGljIFZHX0VORF9BRFM6IHN0cmluZyA9ICdlbmRhZHMnO1xufVxuIl19

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var NewsService = (function () {
    function NewsService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    NewsService.prototype.GetNewsTop = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.getNewsActiveTop, request);
    };
    NewsService.prototype.GetNewsActive = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.getNewsActive, request);
    };
    NewsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], NewsService);
    return NewsService;
}());
exports.NewsService = NewsService;


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var AuthenticationService = (function () {
    function AuthenticationService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    AuthenticationService.prototype.SignInUser = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.signInUser, request);
    };
    AuthenticationService.prototype.GetAccount = function () {
        var self = this;
        return this.tranport.postData(self.urls.account, null);
    };
    AuthenticationService.prototype.SignOutUser = function () {
        var self = this;
        return this.tranport.postData(self.urls.signOutUser, null);
    };
    AuthenticationService.prototype.registration = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.registration, request);
    };
    AuthenticationService.prototype.confirmTheCode = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.confirmTheCode, request);
    };
    AuthenticationService.prototype.replacePassvord = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.replacePassvord, request);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;


/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var NewsAdminService = (function () {
    function NewsAdminService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    NewsAdminService.prototype.GetNewsInfo = function () {
        var self = this;
        return this.tranport.postData(self.urls.getNewsInfo, null);
    };
    NewsAdminService.prototype.GetNews = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.getNews, request);
    };
    NewsAdminService.prototype.AddNews = function (request) {
        var self = this;
        return self.tranport.postData(self.urls.addNews, request);
    };
    NewsAdminService.prototype.SaveNews = function (request) {
        var self = this;
        return self.tranport.postData(self.urls.saveNews, request);
    };
    NewsAdminService.prototype.DellNews = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.dellNews, request);
    };
    NewsAdminService.prototype.ActiveNews = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.activeNews, request);
    };
    NewsAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], NewsAdminService);
    return NewsAdminService;
}());
exports.NewsAdminService = NewsAdminService;


/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var TurnamentAdminService = (function () {
    function TurnamentAdminService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    TurnamentAdminService.prototype.GetTurnamentInfo = function () {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentInfo, null);
    };
    TurnamentAdminService.prototype.AddTurnament = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.addTurnament, request);
    };
    TurnamentAdminService.prototype.DellTurnament = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.dellTurnament, request);
    };
    TurnamentAdminService.prototype.GetTurnament = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.getTurnament, request);
    };
    TurnamentAdminService.prototype.SaveTurnamentInfo = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.saveTurnamentInfo, request);
    };
    TurnamentAdminService.prototype.ChangeStep = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.changeStep, request);
    };
    TurnamentAdminService.prototype.AcceptDeclare = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.acceptDeclare, request);
    };
    TurnamentAdminService.prototype.RemoveDeclare = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.removeDeclare, request);
    };
    TurnamentAdminService.prototype.CalculateTable = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.calculateTable, request);
    };
    TurnamentAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], TurnamentAdminService);
    return TurnamentAdminService;
}());
exports.TurnamentAdminService = TurnamentAdminService;


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_states_1 = __webpack_require__(86);
var VgAPI = (function () {
    function VgAPI() {
        this.medias = {};
        this.playerReadyEvent = new core_1.EventEmitter(true);
        this.isPlayerReady = false;
    }
    VgAPI.prototype.onPlayerReady = function (fsAPI) {
        this.fsAPI = fsAPI;
        this.isPlayerReady = true;
        this.playerReadyEvent.emit(this);
    };
    VgAPI.prototype.getDefaultMedia = function () {
        for (var item in this.medias) {
            if (this.medias[item]) {
                return this.medias[item];
            }
        }
    };
    VgAPI.prototype.getMasterMedia = function () {
        var master;
        for (var id in this.medias) {
            if (this.medias[id].vgMedia === 'true' || this.medias[id].vgMedia === true) {
                master = this.medias[id];
                break;
            }
        }
        return master || this.getDefaultMedia();
    };
    VgAPI.prototype.isMasterDefined = function () {
        var result = false;
        for (var id in this.medias) {
            if (this.medias[id].vgMedia === 'true' || this.medias[id].vgMedia === true) {
                result = true;
                break;
            }
        }
        return result;
    };
    VgAPI.prototype.getMediaById = function (id) {
        if (id === void 0) { id = null; }
        var media = this.medias[id];
        if (!id || id === '*') {
            media = this;
        }
        return media;
    };
    VgAPI.prototype.play = function () {
        for (var id in this.medias) {
            if (this.medias[id]) {
                this.medias[id].play();
            }
        }
    };
    VgAPI.prototype.pause = function () {
        for (var id in this.medias) {
            if (this.medias[id]) {
                this.medias[id].pause();
            }
        }
    };
    Object.defineProperty(VgAPI.prototype, "duration", {
        get: function () {
            return this.$$getAllProperties('duration');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "currentTime", {
        get: function () {
            return this.$$getAllProperties('currentTime');
        },
        set: function (seconds) {
            this.$$setAllProperties('currentTime', seconds);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "state", {
        get: function () {
            return this.$$getAllProperties('state');
        },
        set: function (state) {
            this.$$setAllProperties('state', state);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "volume", {
        get: function () {
            return this.$$getAllProperties('volume');
        },
        set: function (volume) {
            this.$$setAllProperties('volume', volume);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "playbackRate", {
        get: function () {
            return this.$$getAllProperties('playbackRate');
        },
        set: function (rate) {
            this.$$setAllProperties('playbackRate', rate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "canPlay", {
        get: function () {
            return this.$$getAllProperties('canPlay');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "canPlayThrough", {
        get: function () {
            return this.$$getAllProperties('canPlayThrough');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "isMetadataLoaded", {
        get: function () {
            return this.$$getAllProperties('isMetadataLoaded');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "isWaiting", {
        get: function () {
            return this.$$getAllProperties('isWaiting');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "isCompleted", {
        get: function () {
            return this.$$getAllProperties('isCompleted');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "isLive", {
        get: function () {
            return this.$$getAllProperties('isLive');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "isMaster", {
        get: function () {
            return this.$$getAllProperties('isMaster');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "time", {
        get: function () {
            return this.$$getAllProperties('time');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "buffer", {
        get: function () {
            return this.$$getAllProperties('buffer');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "buffered", {
        get: function () {
            return this.$$getAllProperties('buffered');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "subscriptions", {
        get: function () {
            return this.$$getAllProperties('subscriptions');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgAPI.prototype, "textTracks", {
        get: function () {
            return this.$$getAllProperties('textTracks');
        },
        enumerable: true,
        configurable: true
    });
    VgAPI.prototype.seekTime = function (value, byPercent) {
        if (byPercent === void 0) { byPercent = false; }
        for (var id in this.medias) {
            if (this.medias[id]) {
                this.$$seek(this.medias[id], value, byPercent);
            }
        }
    };
    VgAPI.prototype.$$seek = function (media, value, byPercent) {
        if (byPercent === void 0) { byPercent = false; }
        var second;
        var duration = media.duration;
        if (byPercent) {
            if (this.isMasterDefined()) {
                duration = this.getMasterMedia().duration;
            }
            second = value * duration / 100;
        }
        else {
            second = value;
        }
        media.currentTime = second;
    };
    VgAPI.prototype.addTextTrack = function (type, label, language) {
        for (var id in this.medias) {
            if (this.medias[id]) {
                this.$$addTextTrack(this.medias[id], type, label, language);
            }
        }
    };
    VgAPI.prototype.$$addTextTrack = function (media, type, label, language) {
        media.addTextTrack(type, label, language);
    };
    VgAPI.prototype.$$getAllProperties = function (property) {
        var medias = {};
        var result;
        for (var id in this.medias) {
            if (this.medias[id]) {
                medias[id] = this.medias[id];
            }
        }
        var nMedias = Object.keys(medias).length;
        switch (nMedias) {
            case 0:
                // Return default values until vgMedia is initialized
                switch (property) {
                    case 'state':
                        result = vg_states_1.VgStates.VG_PAUSED;
                        break;
                    case 'playbackRate':
                    case 'volume':
                        result = 1;
                        break;
                    case 'time':
                        result = { current: 0, total: 0, left: 0 };
                        break;
                }
                break;
            case 1:
                // If there's only one media element then return the plain value
                var firstMediaId = Object.keys(medias)[0];
                result = medias[firstMediaId][property];
                break;
            default:
                // TODO: return 'master' value
                var master = this.getMasterMedia();
                result = medias[master.id][property];
        }
        return result;
    };
    VgAPI.prototype.$$setAllProperties = function (property, value) {
        for (var id in this.medias) {
            if (this.medias[id]) {
                this.medias[id][property] = value;
            }
        }
    };
    VgAPI.prototype.registerElement = function (elem) {
        this.videogularElement = elem;
    };
    VgAPI.prototype.registerMedia = function (media) {
        this.medias[media.id] = media;
    };
    VgAPI.prototype.unregisterMedia = function (media) {
        delete this.medias[media.id];
    };
    VgAPI.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    VgAPI.ctorParameters = function () { return []; };
    return VgAPI;
}());
exports.VgAPI = VgAPI;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXVEO0FBRXZELGlEQUE2Qzs7SUFXekM7c0JBTmdCLEVBQUU7Z0NBRW9CLElBQUksbUJBQVksQ0FBQyxJQUFJLENBQUM7NkJBQ25DLEtBQUs7S0FLN0I7SUFFRCw2QkFBYSxHQUFiLFVBQWMsS0FBc0I7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQztJQUVELCtCQUFlLEdBQWY7UUFDSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7U0FDSjtLQUNKO0lBRUQsOEJBQWMsR0FBZDtRQUNJLElBQUksTUFBVSxDQUFDO1FBQ2YsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QixLQUFLLENBQUM7YUFDVDtTQUNKO1FBQ0QsTUFBTSxDQUFD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QUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDakM7SUFFRCwrQkFBZSxHQUFmLFVBQWdCLEtBQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNoQzs7Z0JBbFFKLGlCQUFVOzs7O2dCQUxYOztBQU1hLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJUGxheWFibGV9IGZyb20gXCIuLi92Zy1tZWRpYS9pLXBsYXlhYmxlXCI7XG5pbXBvcnQge1ZnU3RhdGVzfSBmcm9tIFwiLi4vc3RhdGVzL3ZnLXN0YXRlc1wiO1xuaW1wb3J0IHsgVmdGdWxsc2NyZWVuQVBJIH0gZnJvbSAnLi92Zy1mdWxsc2NyZWVuLWFwaSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZ0FQSSB7XG4gICAgbWVkaWFzOk9iamVjdCA9IHt9Oy8vIFRPRE86IHJlZmFjdG9yIHRvIFNldDxJUGxheWFibGU+IFxuICAgIHZpZGVvZ3VsYXJFbGVtZW50OiBhbnk7XG4gICAgcGxheWVyUmVhZHlFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIGlzUGxheWVyUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBmc0FQSTogVmdGdWxsc2NyZWVuQVBJO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KGZzQVBJOiBWZ0Z1bGxzY3JlZW5BUEkpIHtcbiAgICAgICAgdGhpcy5mc0FQSSA9IGZzQVBJO1xuICAgICAgICB0aGlzLmlzUGxheWVyUmVhZHkgPSB0cnVlO1xuICAgICAgICB0aGlzLnBsYXllclJlYWR5RXZlbnQuZW1pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0TWVkaWEoKTpJUGxheWFibGUge1xuICAgICAgICBmb3IgKGxldCBpdGVtIGluIHRoaXMubWVkaWFzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZWRpYXNbaXRlbV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZWRpYXNbaXRlbV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNYXN0ZXJNZWRpYSgpOklQbGF5YWJsZSB7XG4gICAgICAgIGxldCBtYXN0ZXI6YW55O1xuICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLm1lZGlhcykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVkaWFzW2lkXS52Z01lZGlhID09PSAndHJ1ZScgfHwgdGhpcy5tZWRpYXNbaWRdLnZnTWVkaWEgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBtYXN0ZXIgPSB0aGlzLm1lZGlhc1tpZF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hc3RlciB8fCB0aGlzLmdldERlZmF1bHRNZWRpYSgpO1xuICAgIH1cblxuICAgIGlzTWFzdGVyRGVmaW5lZCgpOmJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMubWVkaWFzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZWRpYXNbaWRdLnZnTWVkaWEgPT09ICd0cnVlJyB8fCB0aGlzLm1lZGlhc1tpZF0udmdNZWRpYSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBnZXRNZWRpYUJ5SWQoaWQ6c3RyaW5nID0gbnVsbCk6SVBsYXlhYmxlIHtcbiAgICAgICAgbGV0IG1lZGlhID0gdGhpcy5tZWRpYXNbaWRdO1xuXG4gICAgICAgIGlmICghaWQgfHwgaWQgPT09ICcqJykge1xuICAgICAgICAgICAgbWVkaWEgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lZGlhO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMubWVkaWFzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZWRpYXNbaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYXNbIGlkIF0ucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMubWVkaWFzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZWRpYXNbaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYXNbaWRdLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZHVyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiQkZ2V0QWxsUHJvcGVydGllcygnZHVyYXRpb24nKTtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFRpbWUoc2Vjb25kcykge1xuICAgICAgICB0aGlzLiQkc2V0QWxsUHJvcGVydGllcygnY3VycmVudFRpbWUnLCBzZWNvbmRzKTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiQkZ2V0QWxsUHJvcGVydGllcygnY3VycmVudFRpbWUnKTtcbiAgICB9XG5cbiAgICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy4kJHNldEFsbFByb3BlcnRpZXMoJ3N0YXRlJywgc3RhdGUpO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJCRnZXRBbGxQcm9wZXJ0aWVzKCdzdGF0ZScpO1xuICAgIH1cblxuICAgIHNldCB2b2x1bWUodm9sdW1lKSB7XG4gICAgICAgIHRoaXMuJCRzZXRBbGxQcm9wZXJ0aWVzKCd2b2x1bWUnLCB2b2x1bWUpO1xuICAgIH1cblxuICAgIGdldCB2b2x1bWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiQkZ2V0QWxsUHJvcGVydGllcygndm9sdW1lJyk7XG4gICAgfVxuXG4gICAgc2V0IHBsYXliYWNrUmF0ZShyYXRlKSB7XG4gICAgICAgIHRoaXMuJCRzZXRBbGxQcm9wZXJ0aWVzKCdwbGF5YmFja1JhdGUnLCByYXRlKTtcbiAgICB9XG5cbiAgICBnZXQgcGxheWJhY2tSYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kJGdldEFsbFByb3BlcnRpZXMoJ3BsYXliYWNrUmF0ZScpO1xuICAgIH1cblxuICAgIGdldCBjYW5QbGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kJGdldEFsbFByb3BlcnRpZXMoJ2NhblBsYXknKTtcbiAgICB9XG5cbiAgICBnZXQgY2FuUGxheVRocm91Z2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiQkZ2V0QWxsUHJvcGVydGllcygnY2FuUGxheVRocm91Z2gnKTtcbiAgICB9XG5cbiAgICBnZXQgaXNNZXRhZGF0YUxvYWRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJCRnZXRBbGxQcm9wZXJ0aWVzKCdpc01ldGFkYXRhTG9hZGVkJyk7XG4gICAgfVxuXG4gICAgZ2V0IGlzV2FpdGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJCRnZXRBbGxQcm9wZXJ0aWVzKCdpc1dhaXRpbmcnKTtcbiAgICB9XG5cbiAgICBnZXQgaXNDb21wbGV0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiQkZ2V0QWxsUHJvcGVydGllcygnaXNDb21wbGV0ZWQnKTtcbiAgICB9XG5cbiAgICBnZXQgaXNMaXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kJGdldEFsbFByb3BlcnRpZXMoJ2lzTGl2ZScpO1xuICAgIH1cblxuICAgIGdldCBpc01hc3RlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJCRnZXRBbGxQcm9wZXJ0aWVzKCdpc01hc3RlcicpO1xuICAgIH1cblxuICAgIGdldCB0aW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kJGdldEFsbFByb3BlcnRpZXMoJ3RpbWUnKTtcbiAgICB9XG5cbiAgICBnZXQgYnVmZmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kJGdldEFsbFByb3BlcnRpZXMoJ2J1ZmZlcicpO1xuICAgIH1cblxuICAgIGdldCBidWZmZXJlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJCRnZXRBbGxQcm9wZXJ0aWVzKCdidWZmZXJlZCcpO1xuICAgIH1cblxuICAgIGdldCBzdWJzY3JpcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kJGdldEFsbFByb3BlcnRpZXMoJ3N1YnNjcmlwdGlvbnMnKTtcbiAgICB9XG5cbiAgICBnZXQgdGV4dFRyYWNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJCRnZXRBbGxQcm9wZXJ0aWVzKCd0ZXh0VHJhY2tzJyk7XG4gICAgfVxuXG4gICAgc2Vla1RpbWUodmFsdWU6bnVtYmVyLCBieVBlcmNlbnQ6Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMubWVkaWFzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZWRpYXNbaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kJHNlZWsodGhpcy5tZWRpYXNbIGlkIF0sIHZhbHVlLCBieVBlcmNlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCRzZWVrKG1lZGlhOklQbGF5YWJsZSwgdmFsdWU6bnVtYmVyLCBieVBlcmNlbnQ6Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZWNvbmQ6bnVtYmVyO1xuICAgICAgICBsZXQgZHVyYXRpb246bnVtYmVyID0gbWVkaWEuZHVyYXRpb247XG5cbiAgICAgICAgaWYgKGJ5UGVyY2VudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNNYXN0ZXJEZWZpbmVkKCkpIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbiA9IHRoaXMuZ2V0TWFzdGVyTWVkaWEoKS5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2Vjb25kID0gdmFsdWUgKiBkdXJhdGlvbiAvIDEwMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlY29uZCA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbWVkaWEuY3VycmVudFRpbWUgPSBzZWNvbmQ7XG4gICAgfVxuXG4gICAgYWRkVGV4dFRyYWNrKHR5cGU6c3RyaW5nLCBsYWJlbD86c3RyaW5nLCBsYW5ndWFnZT86c3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMubWVkaWFzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZWRpYXNbaWRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kJGFkZFRleHRUcmFjayh0aGlzLm1lZGlhc1sgaWQgXSwgdHlwZSwgbGFiZWwsIGxhbmd1YWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAkJGFkZFRleHRUcmFjayhtZWRpYTpJUGxheWFibGUsIHR5cGU6c3RyaW5nLCBsYWJlbD86c3RyaW5nLCBsYW5ndWFnZT86c3RyaW5nKSB7XG4gICAgICAgIG1lZGlhLmFkZFRleHRUcmFjayh0eXBlLCBsYWJlbCwgbGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgICQkZ2V0QWxsUHJvcGVydGllcyhwcm9wZXJ0eTpzdHJpbmcpe1xuICAgICAgICBjb25zdCBtZWRpYXMgPSB7fTtcbiAgICAgICAgbGV0IHJlc3VsdDphbnk7XG5cbiAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5tZWRpYXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lZGlhc1tpZF0pIHtcbiAgICAgICAgICAgICAgICBtZWRpYXNbIGlkIF0gPSB0aGlzLm1lZGlhc1sgaWQgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5NZWRpYXMgPSBPYmplY3Qua2V5cyhtZWRpYXMpLmxlbmd0aDtcbiAgICAgICAgc3dpdGNoIChuTWVkaWFzKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIGRlZmF1bHQgdmFsdWVzIHVudGlsIHZnTWVkaWEgaXMgaW5pdGlhbGl6ZWRcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFZnU3RhdGVzLlZHX1BBVVNFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BsYXliYWNrUmF0ZSc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ZvbHVtZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7Y3VycmVudDogMCwgdG90YWw6IDAsIGxlZnQ6IDB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBvbmx5IG9uZSBtZWRpYSBlbGVtZW50IHRoZW4gcmV0dXJuIHRoZSBwbGFpbiB2YWx1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TWVkaWFJZCA9IE9iamVjdC5rZXlzKG1lZGlhcylbMF07XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbWVkaWFzW2ZpcnN0TWVkaWFJZF1bcHJvcGVydHldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiByZXR1cm4gJ21hc3RlcicgdmFsdWVcbiAgICAgICAgICAgICAgICBsZXQgbWFzdGVyID0gdGhpcy5nZXRNYXN0ZXJNZWRpYSgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1lZGlhc1ttYXN0ZXIuaWRdW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAkJHNldEFsbFByb3BlcnRpZXMocHJvcGVydHk6c3RyaW5nLCB2YWx1ZTphbnkpe1xuICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLm1lZGlhcykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVkaWFzW2lkXSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVkaWFzWyBpZCBdWyBwcm9wZXJ0eSBdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3RlckVsZW1lbnQoZWxlbTpIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLnZpZGVvZ3VsYXJFbGVtZW50ID0gZWxlbTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck1lZGlhKG1lZGlhOklQbGF5YWJsZSkge1xuICAgICAgICB0aGlzLm1lZGlhc1ttZWRpYS5pZF0gPSBtZWRpYTtcbiAgICB9XG5cbiAgICB1bnJlZ2lzdGVyTWVkaWEobWVkaWE6SVBsYXlhYmxlKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm1lZGlhc1ttZWRpYS5pZF07XG4gICAgfVxuXG5cbn1cbiJdfQ==

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var Subscription_1 = __webpack_require__(12);
var util_1 = __webpack_require__(876);
var promise_tracker_service_1 = __webpack_require__(198);
var busy_service_1 = __webpack_require__(199);
var busy_component_1 = __webpack_require__(365);
var busy_backdrop_component_1 = __webpack_require__(366);
var BusyDirective = (function () {
    function BusyDirective(service, tracker, cfResolver, vcRef, injector) {
        this.service = service;
        this.tracker = tracker;
        this.cfResolver = cfResolver;
        this.vcRef = vcRef;
        this.injector = injector;
    }
    BusyDirective.prototype.normalizeOptions = function (options) {
        if (!options) {
            options = { busy: null };
        }
        else if (Array.isArray(options)
            || options instanceof Promise
            || options instanceof Subscription_1.Subscription) {
            options = { busy: options };
        }
        options = Object.assign({}, this.service.config, options);
        if (!Array.isArray(options.busy)) {
            options.busy = [options.busy];
        }
        return options;
    };
    BusyDirective.prototype.dectectOptionsChange = function () {
        if (util_1.equals(this.optionsNorm, this.optionsRecord)) {
            return false;
        }
        this.optionsRecord = this.optionsNorm;
        return true;
    };
    BusyDirective.prototype.ngDoCheck = function () {
        var options = this.optionsNorm = this.normalizeOptions(this.options);
        if (!this.dectectOptionsChange()) {
            return;
        }
        if (this.busyRef) {
            this.busyRef.instance.context.message = options.message;
        }
        !util_1.equals(options.busy, this.tracker.promiseList)
            && this.tracker.reset({
                promiseList: options.busy,
                delay: options.delay,
                minDuration: options.minDuration
            });
        if (!this.busyRef
            || this.template !== options.template
            || this.backdrop !== options.backdrop) {
            this.destroyComponents();
            this.template = options.template;
            this.backdrop = options.backdrop;
            options.backdrop && this.createBackdrop();
            this.createBusy();
        }
    };
    BusyDirective.prototype.ngOnDestroy = function () {
        this.destroyComponents();
    };
    BusyDirective.prototype.destroyComponents = function () {
        this.busyRef && this.busyRef.destroy();
        this.backdropRef && this.backdropRef.destroy();
    };
    BusyDirective.prototype.createBackdrop = function () {
        var backdropFactory = this.cfResolver.resolveComponentFactory(busy_backdrop_component_1.BusyBackdropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
    };
    BusyDirective.prototype.createBusy = function () {
        var busyFactory = this.cfResolver.resolveComponentFactory(busy_component_1.BusyComponent);
        this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);
        var _a = this.optionsNorm, message = _a.message, wrapperClass = _a.wrapperClass, template = _a.template;
        var instance = this.busyRef.instance;
        instance.context.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
    };
    __decorate([
        core_1.Input('ngBusy'), 
        __metadata('design:type', Object)
    ], BusyDirective.prototype, "options", void 0);
    BusyDirective = __decorate([
        core_1.Directive({
            selector: '[ngBusy]',
            providers: [promise_tracker_service_1.PromiseTrackerService]
        }), 
        __metadata('design:paramtypes', [busy_service_1.BusyService, promise_tracker_service_1.PromiseTrackerService, core_1.ComponentFactoryResolver, core_1.ViewContainerRef, core_1.Injector])
    ], BusyDirective);
    return BusyDirective;
}());
exports.BusyDirective = BusyDirective;
//# sourceMappingURL=busy.directive.js.map

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var promise_tracker_service_1 = __webpack_require__(198);
var inactiveStyle = core_1.style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
var timing = '.3s ease';
;
var BusyComponent = (function () {
    function BusyComponent(tracker) {
        this.tracker = tracker;
        this.context = {
            message: null
        };
    }
    BusyComponent.prototype.isActive = function () {
        return this.tracker.isActive();
    };
    BusyComponent = __decorate([
        core_1.Component({
            selector: 'ng-busy',
            template: "\n        <div [class]=\"wrapperClass\" *ngIf=\"isActive()\" @flyInOut>\n            <DynamicComponent [componentTemplate]=\"template\" [componentInputData]=\"context\">\n            </DynamicComponent>\n        </div>\n    ",
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.transition('void => *', [
                        inactiveStyle,
                        core_1.animate(timing)
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(timing, inactiveStyle)
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [promise_tracker_service_1.PromiseTrackerService])
    ], BusyComponent);
    return BusyComponent;
}());
exports.BusyComponent = BusyComponent;
//# sourceMappingURL=busy.component.js.map

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var promise_tracker_service_1 = __webpack_require__(198);
var inactiveStyle = core_1.style({
    opacity: 0,
});
var timing = '.3s ease';
var BusyBackdropComponent = (function () {
    function BusyBackdropComponent(tracker) {
        this.tracker = tracker;
    }
    BusyBackdropComponent.prototype.isActive = function () {
        return this.tracker.isActive();
    };
    BusyBackdropComponent = __decorate([
        core_1.Component({
            selector: 'ng-busy-backdrop',
            template: "\n        <div class=\"ng-busy-backdrop\"\n             @fadeInOut\n             *ngIf=\"isActive()\">\n        </div>\n    ",
            animations: [
                core_1.trigger('fadeInOut', [
                    core_1.transition('void => *', [
                        inactiveStyle,
                        core_1.animate(timing)
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(timing, inactiveStyle)
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [promise_tracker_service_1.PromiseTrackerService])
    ], BusyBackdropComponent);
    return BusyBackdropComponent;
}());
exports.BusyBackdropComponent = BusyBackdropComponent;
//# sourceMappingURL=busy-backdrop.component.js.map

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(6);
var http_1 = __webpack_require__(55);
var index_1 = __webpack_require__(879);
var Utils_1 = __webpack_require__(882);
var DYNAMIC_SELECTOR = 'DynamicComponent';
var DynamicComponentMetadata = (function () {
    function DynamicComponentMetadata(selector, template) {
        if (selector === void 0) { selector = DYNAMIC_SELECTOR; }
        if (template === void 0) { template = ''; }
        this.selector = selector;
        this.template = template;
    }
    return DynamicComponentMetadata;
}());
exports.DynamicComponentMetadata = DynamicComponentMetadata;
var DynamicComponent = (function () {
    function DynamicComponent(element, viewContainer, compiler, http) {
        this.element = element;
        this.viewContainer = viewContainer;
        this.compiler = compiler;
        this.http = http;
        this.destroyWrapper = false;
    }
    /**
     * @override
     */
    DynamicComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.getComponentTypePromise().then(function (module) {
            _this.compiler.compileModuleAndAllComponentsAsync(module)
                .then(function (moduleWithComponentFactories) {
                if (_this.componentInstance) {
                    _this.componentInstance.destroy();
                }
                _this.componentInstance = _this.viewContainer.createComponent(
                // dynamicComponentClass factory is presented here
                moduleWithComponentFactories.componentFactories.find(function (componentFactory) {
                    return componentFactory.selector === DYNAMIC_SELECTOR
                        || componentFactory.componentType === _this.componentType;
                }));
                _this.applyPropertiesToDynamicComponent(_this.componentInstance.instance);
                // Remove wrapper after render the component
                if (_this.destroyWrapper) {
                    var el = _this.element.nativeElement;
                    if (Utils_1.Utils.isPresent(el.parentNode)) {
                        el.parentNode.removeChild(el);
                    }
                }
            });
        });
    };
    DynamicComponent.prototype.getComponentTypePromise = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (Utils_1.Utils.isPresent(_this.componentTemplate)) {
                resolve(_this.makeComponentModule(_this.componentTemplate));
            }
            else if (Utils_1.Utils.isPresent(_this.componentTemplateUrl)) {
                _this.loadRemoteTemplate(_this.componentTemplateUrl, resolve);
            }
            else {
                resolve(_this.makeComponentModule(null, _this.componentType));
            }
        });
    };
    DynamicComponent.prototype.loadRemoteTemplate = function (url, resolve) {
        var _this = this;
        var requestArgs = { withCredentials: true };
        if (Utils_1.Utils.isPresent(this.componentRemoteTemplateFactory)) {
            requestArgs = this.componentRemoteTemplateFactory.buildRequestOptions();
        }
        this.http.get(url, requestArgs)
            .subscribe(function (response) {
            if (response.status === 301 || response.status === 302) {
                var chainedUrl = response.headers.get('Location');
                console.info('[$DynamicComponent][loadRemoteTemplate] The URL into the chain is:', chainedUrl);
                if (Utils_1.Utils.isPresent(chainedUrl)) {
                    _this.loadRemoteTemplate(chainedUrl, resolve);
                }
                else {
                    console.warn('[$DynamicComponent][loadRemoteTemplate] The URL into the chain is empty. The process of redirect has stopped.');
                }
            }
            else {
                resolve(_this.makeComponentModule(Utils_1.Utils.isPresent(_this.componentRemoteTemplateFactory)
                    ? _this.componentRemoteTemplateFactory.parseResponse(response)
                    : response.text()));
            }
        }, function (response) {
            console.error('[$DynamicComponent][loadRemoteTemplate] Error response:', response);
            resolve(_this.makeComponentModule(''));
        });
    };
    DynamicComponent.prototype.makeComponentModule = function (template, componentType) {
        componentType = this.makeComponent(template, componentType);
        var componentModules = this.componentModules;
        var dynamicComponentModule = (function () {
            function dynamicComponentModule() {
            }
            dynamicComponentModule = __decorate([
                core_1.NgModule({
                    declarations: [componentType],
                    imports: [common_1.CommonModule].concat(componentModules || [])
                }), 
                __metadata('design:paramtypes', [])
            ], dynamicComponentModule);
            return dynamicComponentModule;
        }());
        return dynamicComponentModule;
    };
    DynamicComponent.prototype.makeComponent = function (template, componentType) {
        var annotationsArray, componentDecorator;
        if (Utils_1.Utils.isPresent(componentType)) {
            annotationsArray = index_1.MetadataHelper.findAnnotationsMetaData(componentType, core_1.Component);
            if (annotationsArray.length) {
                componentDecorator = annotationsArray[0];
                Reflect.set(componentDecorator, 'selector', DYNAMIC_SELECTOR);
            }
        }
        var dynamicComponentClass = (function () {
            function dynamicComponentClass() {
            }
            dynamicComponentClass = __decorate([
                core_1.Component(componentDecorator || { selector: DYNAMIC_SELECTOR, template: template }), 
                __metadata('design:paramtypes', [])
            ], dynamicComponentClass);
            return dynamicComponentClass;
        }());
        return dynamicComponentClass;
    };
    DynamicComponent.prototype.applyPropertiesToDynamicComponent = function (instance) {
        var _this = this;
        var metadataHolder = index_1.MetadataHelper.findPropertyMetadata(this, core_1.Input);
        for (var _i = 0, _a = Object.keys(this); _i < _a.length; _i++) {
            var property = _a[_i];
            if (Reflect.has(metadataHolder, property)) {
                if (Reflect.has(instance, property)) {
                    console.warn('[$DynamicComponent][applyPropertiesToDynamicComponent] The property', property, 'will be overwritten for the component', instance);
                }
                Reflect.set(instance, property, Reflect.get(this, property));
            }
        }
        if (Utils_1.Utils.isPresent(this.componentInputData)) {
            var _loop_1 = function(property) {
                if (Reflect.has(instance, property)) {
                    console.warn('[$DynamicComponent][applyPropertiesToDynamicComponent] The property', property, 'will be overwritten for the component', instance);
                }
                var propValue = Reflect.get(this_1.componentInputData, property);
                var attributes = {};
                if (!Utils_1.Utils.isFunction(propValue)) {
                    attributes.set = function (v) { return Reflect.set(_this.componentInputData, property, v); };
                }
                attributes.get = function () { return Reflect.get(_this.componentInputData, property); };
                Reflect.defineProperty(instance, property, attributes);
            };
            var this_1 = this;
            for (var property in this.componentInputData) {
                _loop_1(property);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DynamicComponent.prototype, "componentType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DynamicComponent.prototype, "componentTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DynamicComponent.prototype, "componentInputData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DynamicComponent.prototype, "componentTemplateUrl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DynamicComponent.prototype, "componentRemoteTemplateFactory", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DynamicComponent.prototype, "componentModules", void 0);
    DynamicComponent = __decorate([
        core_1.Component(new DynamicComponentMetadata()), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ViewContainerRef, core_1.Compiler, http_1.Http])
    ], DynamicComponent);
    return DynamicComponent;
}());
exports.DynamicComponent = DynamicComponent;
//# sourceMappingURL=DynamicComponent.js.map

/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(166);
__webpack_require__(167);
exports.PROP_METADATA = 'propMetadata';
exports.ANNOTATIONS_METADATA = 'annotations';
function PropertyAnnotationFactory(annotationMetadata) {
    var Decorator = function (config) {
        return function (target, propertyKey) {
            var meta = Reflect.getOwnMetadata(exports.PROP_METADATA, target.constructor) || {};
            meta[propertyKey] = meta[propertyKey] || [];
            meta[propertyKey].push(Reflect.construct(annotationMetadata, [config]));
            Reflect.defineMetadata(exports.PROP_METADATA, meta, target.constructor);
        };
    };
    var Annotation = Decorator;
    Annotation.annotationMetadata = annotationMetadata;
    return Annotation;
}
exports.PropertyAnnotationFactory = PropertyAnnotationFactory;
//# sourceMappingURL=MetadataFactory.js.map

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

!function(e,r){ true?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.textMaskCore=r():e.textMaskCore=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var o=t(3);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(o).default}});var i=t(2);Object.defineProperty(r,"adjustCaretPosition",{enumerable:!0,get:function(){return n(i).default}});var a=t(5);Object.defineProperty(r,"createTextMaskInputElement",{enumerable:!0,get:function(){return n(a).default}})},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,l=void 0===u?0:u,s=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,v=e.indexesOfPipedChars,p=void 0===v?n:v,h=e.caretTrapIndexes,g=void 0===h?n:h;if(0===l)return 0;var m=f.length,y=t.length,b=c.length,C=s.length,P=m-y,x=P>0,O=0===y,k=P>1&&!x&&!O;if(k)return l;var j=x&&(t===s||s===c),M=0,T=void 0,w=void 0;if(j)M=l-P;else{var _=s.toLowerCase(),V=f.toLowerCase(),S=V.substr(0,l).split(o),N=S.filter(function(e){return _.indexOf(e)!==-1});w=N[N.length-1];var E=a.substr(0,N.length).split(o).filter(function(e){return e!==d}).length,A=c.substr(0,N.length).split(o).filter(function(e){return e!==d}).length,R=A!==E,I=void 0!==a[N.length-1]&&void 0!==c[N.length-2]&&a[N.length-1]!==d&&a[N.length-1]!==c[N.length-1]&&a[N.length-1]===c[N.length-2];!x&&(R||I)&&E>0&&c.indexOf(w)>-1&&void 0!==f[l]&&(T=!0,w=f[l]);for(var J=p.map(function(e){return _[e]}),q=J.filter(function(e){return e===w}).length,F=N.filter(function(e){return e===w}).length,L=c.substr(0,c.indexOf(d)).split(o).filter(function(e,r){return e===w&&f[r]!==e}).length,W=L+F+q+(T?1:0),z=0,B=0;B<C;B++){var D=_[B];if(M=B+1,D===w&&z++,z>=W)break}}if(x){for(var G=M,H=M;H<=b;H++)if(c[H]===d&&(G=H),c[H]===d||g.indexOf(H)!==-1||H===b)return G}else if(T){for(var K=M-1;K>=0;K--)if(s[K]===w||g.indexOf(K)!==-1||0===K)return K}else for(var Q=M;Q>=0;Q--)if(c[Q-1]===d||g.indexOf(Q)!==-1||0===Q)return Q}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=t.guide,u=void 0===n||n,l=t.previousConformedValue,s=void 0===l?a:l,f=t.placeholderChar,d=void 0===f?i.placeholderChar:f,c=t.placeholder,v=void 0===c?(0,o.convertMaskToPlaceholder)(r,d):c,p=t.currentCaretPosition,h=t.keepCharPositions,g=u===!1&&void 0!==s,m=e.length,y=s.length,b=v.length,C=r.length,P=m-y,x=P>0,O=p+(x?-P:0),k=O+Math.abs(P);if(h===!0&&!x){for(var j=a,M=O;M<k;M++)v[M]===d&&(j+=d);e=e.slice(0,O)+j+e.slice(O,m)}for(var T=e.split(a).map(function(e,r){return{char:e,isNew:r>=O&&r<k}}),w=m-1;w>=0;w--){var _=T[w].char;if(_!==d){var V=w>=O&&y===C;_===v[V?w-P:w]&&T.splice(w,1)}}var S=a,N=!1;e:for(var E=0;E<b;E++){var A=v[E];if(A===d){if(T.length>0)for(;T.length>0;){var R=T.shift(),I=R.char,J=R.isNew;if(I===d&&g!==!0){S+=d;continue e}if(r[E].test(I)){if(h===!0&&J!==!1&&s!==a&&u!==!1&&x){for(var q=T.length,F=null,L=0;L<q;L++){var W=T[L];if(W.char!==d&&W.isNew===!1)break;if(W.char===d){F=L;break}}null!==F?(S+=I,T.splice(F,1)):E--}else S+=I;continue e}N=!0}g===!1&&(S+=v.substr(E,b));break}S+=A}if(g&&x===!1){for(var z=null,B=0;B<S.length;B++)v[B]===d&&(z=B);S=null!==z?S.substr(0,z+1):a}return{conformedValue:S,meta:{someCharsRejected:N}}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=n;var o=t(4),i=t(1),a=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.placeholderChar;if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return"string"==typeof e||e instanceof String}function i(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function a(e){for(var r=[],t=void 0;t=e.indexOf(s),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isString=o,r.isNumber=i,r.processCaretTraps=a;var u=t(1),l=[],s="[]"},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:r,update:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,s=n.mask,d=n.guide,m=n.pipe,b=n.placeholderChar,C=void 0===b?p.placeholderChar:b,P=n.keepCharPositions,x=void 0!==P&&P,O=n.showMask,k=void 0!==O&&O;if("undefined"==typeof t&&(t=o.value),t!==r.previousConformedValue){("undefined"==typeof s?"undefined":l(s))===y&&void 0!==s.pipe&&void 0!==s.mask&&(m=s.pipe,s=s.mask);var j=void 0,M=void 0;if(s instanceof Array&&(j=(0,v.convertMaskToPlaceholder)(s,C)),s!==!1){var T=a(t),w=o.selectionEnd,_=r.previousConformedValue,V=r.previousPlaceholder,S=void 0;if(("undefined"==typeof s?"undefined":l(s))===h){if(M=s(T,{currentCaretPosition:w,previousConformedValue:_,placeholderChar:C}),M===!1)return;var N=(0,v.processCaretTraps)(M),E=N.maskWithoutCaretTraps,A=N.indexes;M=E,S=A,j=(0,v.convertMaskToPlaceholder)(M,C)}else M=s;var R={previousConformedValue:_,guide:d,placeholderChar:C,pipe:m,placeholder:j,currentCaretPosition:w,keepCharPositions:x},I=(0,c.default)(T,M,R),J=I.conformedValue,q=("undefined"==typeof m?"undefined":l(m))===h,F={};q&&(F=m(J,u({rawValue:T},R)),F===!1?F={value:_,rejected:!0}:(0,v.isString)(F)&&(F={value:F}));var L=q?F.value:J,W=(0,f.default)({previousConformedValue:_,previousPlaceholder:V,conformedValue:L,placeholder:j,rawValue:T,currentCaretPosition:w,placeholderChar:C,indexesOfPipedChars:F.indexesOfPipedChars,caretTrapIndexes:S}),z=L===j&&0===W,B=k?j:g,D=z?B:L;r.previousConformedValue=D,r.previousPlaceholder=j,o.value!==D&&(o.value=D,i(o,W))}}}}}function i(e,r){document.activeElement===e&&(b?C(function(){return e.setSelectionRange(r,r,m)},0):e.setSelectionRange(r,r,m))}function a(e){if((0,v.isString)(e))return e;if((0,v.isNumber)(e))return String(e);if(void 0===e||null===e)return g;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var s=t(2),f=n(s),d=t(3),c=n(d),v=t(4),p=t(1),h="function",g="",m="none",y="object",b="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),C="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MYDP_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MyDatePicker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_my_date_picker_locale_service__ = __webpack_require__(887);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_my_date_picker_util_service__ = __webpack_require__(888);




var MYDP_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return MyDatePicker; }),
    multi: true
};
var CalToggle;
(function (CalToggle) {
    CalToggle[CalToggle["Open"] = 1] = "Open";
    CalToggle[CalToggle["CloseByDateSel"] = 2] = "CloseByDateSel";
    CalToggle[CalToggle["CloseByCalBtn"] = 3] = "CloseByCalBtn";
    CalToggle[CalToggle["CloseByOutClick"] = 4] = "CloseByOutClick";
    CalToggle[CalToggle["CloseByEsc"] = 5] = "CloseByEsc";
    CalToggle[CalToggle["CloseByApi"] = 6] = "CloseByApi";
})(CalToggle || (CalToggle = {}));
var Year;
(function (Year) {
    Year[Year["min"] = 1000] = "min";
    Year[Year["max"] = 9999] = "max";
})(Year || (Year = {}));
var InputFocusBlur;
(function (InputFocusBlur) {
    InputFocusBlur[InputFocusBlur["focus"] = 1] = "focus";
    InputFocusBlur[InputFocusBlur["blur"] = 2] = "blur";
})(InputFocusBlur || (InputFocusBlur = {}));
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["enter"] = 13] = "enter";
    KeyCode[KeyCode["esc"] = 27] = "esc";
    KeyCode[KeyCode["space"] = 32] = "space";
})(KeyCode || (KeyCode = {}));
var MonthId;
(function (MonthId) {
    MonthId[MonthId["prev"] = 1] = "prev";
    MonthId[MonthId["curr"] = 2] = "curr";
    MonthId[MonthId["next"] = 3] = "next";
})(MonthId || (MonthId = {}));
var MMM = "mmm";
var MyDatePicker = (function () {
    function MyDatePicker(elem, renderer, cdr, localeService, utilService) {
        this.elem = elem;
        this.renderer = renderer;
        this.cdr = cdr;
        this.localeService = localeService;
        this.utilService = utilService;
        this.dateChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.inputFieldChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.calendarViewChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.calendarToggle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.inputFocusBlur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onChangeCb = function () { };
        this.onTouchedCb = function () { };
        this.showSelector = false;
        this.visibleMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedDate = { year: 0, month: 0, day: 0 };
        this.weekDays = [];
        this.dates = [];
        this.months = [];
        this.years = [];
        this.selectionDayTxt = "";
        this.invalidDate = false;
        this.disableTodayBtn = false;
        this.dayIdx = 0;
        this.selectMonth = false;
        this.selectYear = false;
        this.prevMonthDisabled = false;
        this.nextMonthDisabled = false;
        this.prevYearDisabled = false;
        this.nextYearDisabled = false;
        this.prevYearsDisabled = false;
        this.nextYearsDisabled = false;
        this.prevMonthId = MonthId.prev;
        this.currMonthId = MonthId.curr;
        this.nextMonthId = MonthId.next;
        this.opts = {
            dayLabels: {},
            monthLabels: {},
            dateFormat: "",
            showTodayBtn: true,
            todayBtnTxt: "",
            firstDayOfWeek: "",
            satHighlight: false,
            sunHighlight: true,
            highlightDates: [],
            markCurrentDay: true,
            markCurrentMonth: true,
            markCurrentYear: true,
            disableUntil: { year: 0, month: 0, day: 0 },
            disableSince: { year: 0, month: 0, day: 0 },
            disableDays: [],
            enableDays: [],
            markDates: [],
            markWeekends: {},
            disableDateRanges: [],
            disableWeekends: false,
            disableWeekdays: [],
            showWeekNumbers: false,
            height: "34px",
            width: "100%",
            selectionTxtFontSize: "14px",
            selectorHeight: "232px",
            selectorWidth: "252px",
            allowDeselectDate: false,
            inline: false,
            showClearDateBtn: true,
            showDecreaseDateBtn: false,
            showIncreaseDateBtn: false,
            alignSelectorRight: false,
            openSelectorTopOfInput: false,
            indicateInvalidDate: true,
            editableDateField: true,
            monthSelector: true,
            yearSelector: true,
            disableHeaderButtons: true,
            minYear: Year.min,
            maxYear: Year.max,
            componentDisabled: false,
            showSelectorArrow: true,
            showInputField: true,
            openSelectorOnInputClick: false,
            allowSelectionOnlyInCurrentMonth: true,
            ariaLabelInputField: "Date input field",
            ariaLabelClearDate: "Clear Date",
            ariaLabelDecreaseDate: "Decrease Date",
            ariaLabelIncreaseDate: "Increase Date",
            ariaLabelOpenCalendar: "Open Calendar",
            ariaLabelPrevMonth: "Previous Month",
            ariaLabelNextMonth: "Next Month",
            ariaLabelPrevYear: "Previous Year",
            ariaLabelNextYear: "Next Year"
        };
        this.setLocaleOptions();
    }
    MyDatePicker.prototype.setLocaleOptions = function () {
        var _this = this;
        var opts = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach(function (k) {
            _this.opts[k] = opts[k];
        });
    };
    MyDatePicker.prototype.setOptions = function () {
        var _this = this;
        if (this.options !== undefined) {
            Object.keys(this.options).forEach(function (k) {
                _this.opts[k] = _this.options[k];
            });
        }
        if (this.opts.minYear < Year.min) {
            this.opts.minYear = Year.min;
        }
        if (this.opts.maxYear > Year.max) {
            this.opts.maxYear = Year.max;
        }
        if (this.disabled !== undefined) {
            this.opts.componentDisabled = this.disabled;
        }
    };
    MyDatePicker.prototype.getSelectorTopPosition = function () {
        if (this.opts.openSelectorTopOfInput) {
            return this.elem.nativeElement.children[0].offsetHeight + "px";
        }
    };
    MyDatePicker.prototype.resetMonthYearSelect = function () {
        this.selectMonth = false;
        this.selectYear = false;
    };
    MyDatePicker.prototype.onSelectMonthClicked = function (event) {
        event.stopPropagation();
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            var today = this.getToday();
            this.months.length = 0;
            for (var i = 1; i <= 12; i += 3) {
                var row = [];
                for (var j = i; j < i + 3; j++) {
                    var disabled = this.utilService.isMonthDisabledByDisableUntil({ year: this.visibleMonth.year, month: j, day: this.daysInMonth(j, this.visibleMonth.year) }, this.opts.disableUntil)
                        || this.utilService.isMonthDisabledByDisableSince({ year: this.visibleMonth.year, month: j, day: 1 }, this.opts.disableSince);
                    row.push({ nbr: j, name: this.opts.monthLabels[j], currMonth: j === today.month && this.visibleMonth.year === today.year, selected: j === this.visibleMonth.monthNbr, disabled: disabled });
                }
                this.months.push(row);
            }
        }
    };
    MyDatePicker.prototype.onMonthCellClicked = function (cell) {
        var mc = cell.nbr !== this.visibleMonth.monthNbr;
        this.visibleMonth = { monthTxt: this.monthText(cell.nbr), monthNbr: cell.nbr, year: this.visibleMonth.year };
        this.generateCalendar(cell.nbr, this.visibleMonth.year, mc);
        this.selectMonth = false;
        this.selectorEl.nativeElement.focus();
    };
    MyDatePicker.prototype.onMonthCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onMonthCellClicked(cell);
        }
    };
    MyDatePicker.prototype.onSelectYearClicked = function (event) {
        event.stopPropagation();
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(Number(this.visibleMonth.year));
        }
    };
    MyDatePicker.prototype.onYearCellClicked = function (cell) {
        var yc = cell.year !== this.visibleMonth.year;
        this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: cell.year };
        this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
        this.selectYear = false;
        this.selectorEl.nativeElement.focus();
    };
    MyDatePicker.prototype.onYearCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onYearCellClicked(cell);
        }
    };
    MyDatePicker.prototype.onPrevYears = function (event, year) {
        event.stopPropagation();
        this.generateYears(Number(year) - 25);
    };
    MyDatePicker.prototype.onNextYears = function (event, year) {
        event.stopPropagation();
        this.generateYears(Number(year) + 25);
    };
    MyDatePicker.prototype.generateYears = function (year) {
        this.years.length = 0;
        var today = this.getToday();
        for (var i = year; i <= 20 + year; i += 5) {
            var row = [];
            for (var j = i; j < i + 5; j++) {
                var disabled = this.utilService.isMonthDisabledByDisableUntil({ year: j, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, j) }, this.opts.disableUntil)
                    || this.utilService.isMonthDisabledByDisableSince({ year: j, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
                var minMax = j < this.opts.minYear || j > this.opts.maxYear;
                row.push({ year: j, currYear: j === today.year, selected: j === this.visibleMonth.year, disabled: disabled || minMax });
            }
            this.years.push(row);
        }
        this.prevYearsDisabled = this.years[0][0].year <= this.opts.minYear || this.utilService.isMonthDisabledByDisableUntil({ year: this.years[0][0].year - 1, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, this.years[0][0].year - 1) }, this.opts.disableUntil);
        this.nextYearsDisabled = this.years[4][4].year >= this.opts.maxYear || this.utilService.isMonthDisabledByDisableSince({ year: this.years[4][4].year + 1, month: this.visibleMonth.monthNbr, day: 1 }, this.opts.disableSince);
    };
    MyDatePicker.prototype.onUserDateInput = function (value) {
        if (value.length === 0) {
            if (this.utilService.isInitializedDate(this.selectedDate)) {
                this.clearDate();
            }
            else {
                this.invalidInputFieldChanged(value);
            }
        }
        else {
            var date = this.utilService.isDateValid(value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDays);
            if (this.utilService.isInitializedDate(date)) {
                if (!this.utilService.isSameDate(date, this.selectedDate)) {
                    this.selectDate(date, CalToggle.CloseByDateSel);
                }
                else {
                    this.updateDateValue(date);
                }
            }
            else {
                this.invalidInputFieldChanged(value);
            }
        }
    };
    MyDatePicker.prototype.onFocusInput = function (event) {
        this.inputFocusBlur.emit({ reason: InputFocusBlur.focus, value: event.target.value });
    };
    MyDatePicker.prototype.onBlurInput = function (event) {
        this.selectionDayTxt = event.target.value;
        this.onTouchedCb();
        this.inputFocusBlur.emit({ reason: InputFocusBlur.blur, value: event.target.value });
    };
    MyDatePicker.prototype.onCloseSelector = function (event) {
        if (event.keyCode === KeyCode.esc && this.showSelector && !this.opts.inline) {
            this.calendarToggle.emit(CalToggle.CloseByEsc);
            this.showSelector = false;
        }
    };
    MyDatePicker.prototype.invalidInputFieldChanged = function (value) {
        this.invalidDate = value.length > 0;
        this.inputFieldChanged.emit({ value: value, dateFormat: this.opts.dateFormat, valid: false });
        this.onChangeCb(null);
        this.onTouchedCb();
    };
    MyDatePicker.prototype.isTodayDisabled = function () {
        this.disableTodayBtn = this.utilService.isDisabledDay(this.getToday(), this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays);
    };
    MyDatePicker.prototype.parseOptions = function () {
        if (this.locale) {
            this.setLocaleOptions();
        }
        this.setOptions();
        var weekDays = this.utilService.getWeekDays();
        this.isTodayDisabled();
        this.dayIdx = weekDays.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            var idx = this.dayIdx;
            for (var i = 0; i < weekDays.length; i++) {
                this.weekDays.push(this.opts.dayLabels[weekDays[idx]]);
                idx = weekDays[idx] === "sa" ? 0 : idx + 1;
            }
        }
    };
    MyDatePicker.prototype.writeValue = function (value) {
        if (value && (value["date"] || value["jsdate"] || value["formatted"])) {
            this.selectedDate = value["date"] ? this.parseSelectedDate(value["date"]) : value["jsdate"] ? this.parseSelectedDate(this.jsDateToMyDate(value["jsdate"])) : this.parseSelectedDate(value["formatted"]);
            var cvc = this.visibleMonth.year !== this.selectedDate.year || this.visibleMonth.monthNbr !== this.selectedDate.month;
            if (cvc) {
                this.visibleMonth = { monthTxt: this.opts.monthLabels[this.selectedDate.month], monthNbr: this.selectedDate.month, year: this.selectedDate.year };
                this.generateCalendar(this.selectedDate.month, this.selectedDate.year, cvc);
            }
            this.selectionDayTxt = this.utilService.formatDate(this.selectedDate, this.opts.dateFormat, this.opts.monthLabels);
        }
        else if (value === null || value === "") {
            this.selectedDate = { year: 0, month: 0, day: 0 };
            this.selectionDayTxt = "";
        }
        this.inputFieldChanged.emit({ value: this.selectionDayTxt, dateFormat: this.opts.dateFormat, valid: this.selectionDayTxt.length > 0 });
        this.invalidDate = false;
    };
    MyDatePicker.prototype.setDisabledState = function (disabled) {
        this.opts.componentDisabled = disabled;
    };
    MyDatePicker.prototype.registerOnChange = function (fn) {
        this.onChangeCb = fn;
    };
    MyDatePicker.prototype.registerOnTouched = function (fn) {
        this.onTouchedCb = fn;
    };
    MyDatePicker.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.hasOwnProperty("selector")) {
            var s = changes["selector"].currentValue;
            if (typeof s === "object") {
                if (s.open) {
                    this.showSelector = true;
                    this.openSelector(CalToggle.Open);
                }
                else {
                    this.showSelector = false;
                    this.closeSelector(CalToggle.CloseByApi);
                }
            }
            else if (s > 0) {
                this.openBtnClicked();
            }
        }
        if (changes.hasOwnProperty("placeholder")) {
            this.placeholder = changes["placeholder"].currentValue;
        }
        if (changes.hasOwnProperty("locale")) {
            this.locale = changes["locale"].currentValue;
        }
        if (changes.hasOwnProperty("disabled")) {
            this.disabled = changes["disabled"].currentValue;
        }
        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
        }
        this.weekDays.length = 0;
        this.parseOptions();
        var dmChange = false;
        if (changes.hasOwnProperty("defaultMonth")) {
            var dm = changes["defaultMonth"].currentValue;
            if (typeof dm === "object") {
                dm = dm.defMonth;
            }
            if (dm !== null && dm !== undefined && dm !== "") {
                this.selectedMonth = this.parseSelectedMonth(dm);
            }
            else {
                this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
            }
            dmChange = true;
        }
        if (changes.hasOwnProperty("selDate")) {
            var sd = changes["selDate"];
            if (sd.currentValue !== null && sd.currentValue !== undefined && sd.currentValue !== "" && Object.keys(sd.currentValue).length !== 0) {
                this.selectedDate = this.parseSelectedDate(sd.currentValue);
                setTimeout(function () {
                    _this.onChangeCb(_this.getDateModel(_this.selectedDate));
                });
            }
            else {
                if (!sd.isFirstChange()) {
                    this.clearDate();
                }
            }
        }
        if (this.visibleMonth.year === 0 && this.visibleMonth.monthNbr === 0 || dmChange) {
            this.setVisibleMonth();
        }
        else {
            this.visibleMonth.monthTxt = this.opts.monthLabels[this.visibleMonth.monthNbr];
            this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, false);
        }
    };
    MyDatePicker.prototype.removeBtnClicked = function () {
        this.clearDate();
        if (this.showSelector) {
            this.calendarToggle.emit(CalToggle.CloseByCalBtn);
        }
        this.showSelector = false;
    };
    MyDatePicker.prototype.onDecreaseBtnClicked = function () {
        this.decreaseIncreaseDate(true);
    };
    MyDatePicker.prototype.onIncreaseBtnClicked = function () {
        this.decreaseIncreaseDate(false);
    };
    MyDatePicker.prototype.openBtnClicked = function () {
        this.showSelector = !this.showSelector;
        this.cdr.detectChanges();
        if (this.showSelector) {
            this.openSelector(CalToggle.Open);
        }
        else {
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
    };
    MyDatePicker.prototype.openSelector = function (reason) {
        var _this = this;
        this.globalListener = this.globalListener || this.renderer.listenGlobal("document", "click", function (event) {
            if (_this.showSelector && event.target && _this.elem.nativeElement !== event.target && !_this.elem.nativeElement.contains(event.target)) {
                _this.showSelector = false;
                _this.calendarToggle.emit(CalToggle.CloseByOutClick);
            }
            if (_this.opts.monthSelector || _this.opts.yearSelector) {
                _this.resetMonthYearSelect();
            }
        });
        this.setVisibleMonth();
        this.calendarToggle.emit(reason);
    };
    MyDatePicker.prototype.closeSelector = function (reason) {
        if (this.globalListener) {
            this.globalListener();
        }
        this.calendarToggle.emit(reason);
    };
    MyDatePicker.prototype.setVisibleMonth = function () {
        var y = 0, m = 0;
        if (!this.utilService.isInitializedDate(this.selectedDate)) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                var today = this.getToday();
                y = today.year;
                m = today.month;
            }
            else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDatePicker.prototype.onPrevMonth = function () {
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDatePicker.prototype.onNextMonth = function () {
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDatePicker.prototype.onPrevYear = function () {
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    MyDatePicker.prototype.onNextYear = function () {
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    MyDatePicker.prototype.onTodayClicked = function () {
        var today = this.getToday();
        this.selectDate(today, CalToggle.CloseByDateSel);
        if (this.opts.inline && today.year !== this.visibleMonth.year || today.month !== this.visibleMonth.monthNbr) {
            this.visibleMonth = { monthTxt: this.opts.monthLabels[today.month], monthNbr: today.month, year: today.year };
            this.generateCalendar(today.month, today.year, true);
        }
    };
    MyDatePicker.prototype.onCellClicked = function (cell) {
        if (cell.cmo === this.prevMonthId) {
            this.onPrevMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel);
            }
        }
        else if (cell.cmo === this.currMonthId) {
            if (this.opts.allowDeselectDate && this.utilService.isSameDate(cell.dateObj, this.selectedDate)) {
                this.clearDate();
            }
            else {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel);
            }
        }
        else if (cell.cmo === this.nextMonthId) {
            this.onNextMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel);
            }
        }
        this.resetMonthYearSelect();
    };
    MyDatePicker.prototype.onCellKeyDown = function (event, cell) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onCellClicked(cell);
        }
    };
    MyDatePicker.prototype.clearDate = function () {
        this.updateDateValue({ year: 0, month: 0, day: 0 });
        this.setFocusToInputBox();
    };
    MyDatePicker.prototype.decreaseIncreaseDate = function (decrease) {
        var date = this.selectedDate;
        if (this.utilService.isInitializedDate(date)) {
            var d = this.getDate(date.year, date.month, date.day);
            d.setDate(decrease ? d.getDate() - 1 : d.getDate() + 1);
            date = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        }
        else {
            date = this.getToday();
        }
        this.selectDate(date, CalToggle.CloseByCalBtn);
    };
    MyDatePicker.prototype.selectDate = function (date, closeReason) {
        this.updateDateValue(date);
        if (this.showSelector) {
            this.calendarToggle.emit(closeReason);
        }
        this.showSelector = false;
        this.setFocusToInputBox();
    };
    MyDatePicker.prototype.setFocusToInputBox = function () {
        var _this = this;
        if (!this.opts.inline && this.opts.showInputField) {
            setTimeout(function () {
                _this.inputBoxEl.nativeElement.focus();
            }, 100);
        }
    };
    MyDatePicker.prototype.updateDateValue = function (date) {
        var clear = !this.utilService.isInitializedDate(date);
        this.selectedDate = date;
        this.emitDateChanged(date);
        if (!this.opts.inline) {
            this.selectionDayTxt = clear ? "" : this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels);
            this.inputFieldChanged.emit({ value: this.selectionDayTxt, dateFormat: this.opts.dateFormat, valid: !clear });
            this.invalidDate = false;
        }
    };
    MyDatePicker.prototype.emitDateChanged = function (date) {
        if (this.utilService.isInitializedDate(date)) {
            var dateModel = this.getDateModel(date);
            this.dateChanged.emit(dateModel);
            this.onChangeCb(dateModel);
            this.onTouchedCb();
        }
        else {
            this.dateChanged.emit({ date: date, jsdate: null, formatted: "", epoc: 0 });
            this.onChangeCb(null);
            this.onTouchedCb();
        }
    };
    MyDatePicker.prototype.getDateModel = function (date) {
        return { date: date, jsdate: this.getDate(date.year, date.month, date.day), formatted: this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels), epoc: Math.round(this.getTimeInMilliseconds(date) / 1000.0) };
    };
    MyDatePicker.prototype.monthText = function (m) {
        return this.opts.monthLabels[m];
    };
    MyDatePicker.prototype.monthStartIdx = function (y, m) {
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    MyDatePicker.prototype.daysInMonth = function (m, y) {
        return new Date(y, m, 0).getDate();
    };
    MyDatePicker.prototype.daysInPrevMonth = function (m, y) {
        var d = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    };
    MyDatePicker.prototype.isCurrDay = function (d, m, y, cmo, today) {
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    };
    MyDatePicker.prototype.getToday = function () {
        var date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    MyDatePicker.prototype.getTimeInMilliseconds = function (date) {
        return this.getDate(date.year, date.month, date.day).getTime();
    };
    MyDatePicker.prototype.getWeekday = function (date) {
        var weekDays = this.utilService.getWeekDays();
        return weekDays[this.utilService.getDayNumber(date)];
    };
    MyDatePicker.prototype.getDate = function (year, month, day) {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    MyDatePicker.prototype.sundayIdx = function () {
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    MyDatePicker.prototype.generateCalendar = function (m, y, notifyChange) {
        this.dates.length = 0;
        var today = this.getToday();
        var monthStart = this.monthStartIdx(y, m);
        var dInThisM = this.daysInMonth(m, y);
        var dInPrevM = this.daysInPrevMonth(m, y);
        var dayNbr = 1;
        var cmo = this.prevMonthId;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                var pm = dInPrevM - monthStart + 1;
                for (var j = pm; j <= dInPrevM; j++) {
                    var date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                }
                cmo = this.currMonthId;
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            else {
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    var date = { year: cmo === this.nextMonthId && m === 12 ? y + 1 : y, month: cmo === this.currMonthId ? m : cmo === this.nextMonthId && m < 12 ? m + 1 : 1, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates) });
                    dayNbr++;
                }
            }
            var weekNbr = this.opts.showWeekNumbers && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }
        this.setHeaderBtnDisabledState(m, y);
        if (notifyChange) {
            this.calendarViewChanged.emit({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    };
    MyDatePicker.prototype.parseSelectedDate = function (selDate) {
        var date = { day: 0, month: 0, year: 0 };
        if (typeof selDate === "string") {
            var sd = selDate;
            var df = this.opts.dateFormat;
            var delimeters = this.utilService.getDateFormatDelimeters(df);
            var dateValue = this.utilService.getDateValue(sd, df, delimeters);
            date.year = this.utilService.getNumberByValue(dateValue[0]);
            date.month = df.indexOf(MMM) !== -1 ? this.utilService.getMonthNumberByMonthName(dateValue[1], this.opts.monthLabels) : this.utilService.getNumberByValue(dateValue[1]);
            date.day = this.utilService.getNumberByValue(dateValue[2]);
        }
        else if (typeof selDate === "object") {
            date = selDate;
        }
        this.selectionDayTxt = this.utilService.formatDate(date, this.opts.dateFormat, this.opts.monthLabels);
        return date;
    };
    MyDatePicker.prototype.jsDateToMyDate = function (date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    MyDatePicker.prototype.parseSelectedMonth = function (ms) {
        return this.utilService.parseDefaultMonth(ms);
    };
    MyDatePicker.prototype.setHeaderBtnDisabledState = function (m, y) {
        var dpm = false;
        var dpy = false;
        var dnm = false;
        var dny = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({ year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y) }, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({ year: y - 1, month: m, day: this.daysInMonth(m, y - 1) }, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({ year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1 }, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({ year: y + 1, month: m, day: 1 }, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    };
    MyDatePicker.prototype.ngOnDestroy = function () {
        if (this.globalListener) {
            this.globalListener();
        }
    };
    MyDatePicker.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: "my-date-picker",
                    exportAs: "mydatepicker",
                    styles: [".mydp .headertodaybtn,.mydp .monthcell,.mydp .selection,.mydp .weekdaytitle{overflow:hidden;white-space:nowrap}.mydp{line-height:1.1;display:inline-block;position:relative}.mydp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.mydp,.mydp .headertodaybtn,.mydp .selection,.mydp .selectiongroup,.mydp .selector{border-radius:4px}.mydp .header{border-radius:4px 4px 0 0}.mydp .caltable,.mydp .monthtable,.mydp .yeartable{border-radius:0 0 4px 4px}.mydp .caltable tbody tr:nth-child(6) td:first-child,.mydp .monthtable tbody tr:nth-child(4) td:first-child,.mydp .yeartable tbody tr:nth-child(7) td:first-child{border-bottom-left-radius:4px}.mydp .caltable tbody tr:nth-child(6) td:last-child,.mydp .monthtable tbody tr:nth-child(4) td:last-child,.mydp .yeartable tbody tr:nth-child(7) td:last-child{border-bottom-right-radius:4px}.mydp .btnpicker{border-radius:0 4px 4px 0}.mydp .btnleftborderradius{border-top-left-radius:4px;border-bottom-left-radius:4px}.mydp .selector{margin-top:2px;margin-left:-1px;position:absolute;padding:0;border:1px solid #CCC;z-index:100;animation:selectorfadein .1s}.mydp .selector:focus{border:1px solid #ADD8E6;outline:0}@keyframes selectorfadein{from{opacity:0}to{opacity:1}}.mydp .selectorarrow{background:#FAFAFA;margin-top:12px;padding:0}.mydp .selectorarrow:after,.mydp .selectorarrow:before{bottom:100%;border:solid transparent;content:\" \";height:0;width:0;position:absolute}.mydp .selectorarrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#FAFAFA;border-width:10px;margin-left:-10px}.mydp .selectorarrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#CCC;border-width:11px;margin-left:-11px}.mydp .selectorarrow:focus:before{border-bottom-color:#ADD8E6}.mydp .selectorarrowleft:after,.mydp .selectorarrowleft:before{left:24px}.mydp .selectorarrowright:after,.mydp .selectorarrowright:before{left:86%}.mydp .alignselectorright{right:-1px}.mydp .selectiongroup{position:relative;display:table;border:none;border-spacing:0;background-color:#FFF}.mydp .selection{width:100%;outline:0;background-color:#FFF;display:table-cell;position:absolute;text-overflow:ellipsis;padding-left:6px;border:none;color:#555}.mydp .invaliddate{background-color:#F1DEDE}.mydp ::-ms-clear{display:none}.mydp .headerbtncell,.mydp .selbtngroup{display:table-cell;vertical-align:middle}.mydp .selbtngroup{position:relative;white-space:nowrap;width:1%;font-size:0}.mydp .btnclear,.mydp .btndecrease,.mydp .btnincrease,.mydp .btnpicker{height:100%;width:26px;border:none;padding:0;outline:0;font:inherit;-moz-user-select:none}.mydp .btnleftborder{border-left:1px solid #CCC}.mydp .btnclearenabled,.mydp .btndecreaseenabled,.mydp .btnincreaseenabled,.mydp .btnpickerenabled,.mydp .headerbtnenabled,.mydp .headertodaybtnenabled,.mydp .yearchangebtnenabled{cursor:pointer}.mydp .btncleardisabled,.mydp .btndecreasedisabled,.mydp .btnincreasedisabled,.mydp .btnpickerdisabled,.mydp .headerbtndisabled,.mydp .headertodaybtndisabled,.mydp .selectiondisabled,.mydp .yearchangebtndisabled{cursor:not-allowed;opacity:.65}.mydp .selectiondisabled{background-color:#EEE}.mydp .btnclear,.mydp .btndecrease,.mydp .btnincrease,.mydp .btnpicker,.mydp .headertodaybtn{background:#FFF}.mydp .header{width:100%;height:30px;background-color:#FAFAFA}.mydp .header td{vertical-align:middle;border:none;line-height:0}.mydp .header td:nth-child(1){padding-left:4px}.mydp .header td:nth-child(2){text-align:center}.mydp .header td:nth-child(3){padding-right:4px}.mydp .caltable,.mydp .monthtable,.mydp .yeartable{table-layout:fixed;width:100%;height:calc(100% - 30px);background-color:#FFF;font-size:14px}.mydp .caltable,.mydp .daycell,.mydp .monthcell,.mydp .monthtable,.mydp .weekdaytitle,.mydp .yearcell,.mydp .yeartable{border-collapse:collapse;color:#036;line-height:1.1}.mydp .daycell,.mydp .monthcell,.mydp .weekdaytitle,.mydp .yearcell{padding:4px;text-align:center}.mydp .weekdaytitle{background-color:#DDD;font-size:11px;font-weight:400;vertical-align:middle;max-width:36px}.mydp .weekdaytitleweeknbr{width:20px;border-right:1px solid #BBB}.mydp .monthcell{background-color:#FAFAFA}.mydp .yearcell{background-color:#FAFAFA;width:20%}.mydp .daycell .datevalue{background-color:inherit;vertical-align:middle}.mydp .daycell .datevalue span{vertical-align:middle}.mydp .daycellweeknbr{font-size:10px;border-right:1px solid #CCC;cursor:default;color:#000}.mydp .inlinedp{position:relative;margin-top:-1px}.mydp .nextmonth,.mydp .prevmonth{color:#999}.mydp .disabled{cursor:default!important;color:#CCC;background:#FBEFEF}.mydp .highlight{color:#C30000}.mydp .dimday{opacity:.5}.mydp .currmonth{background-color:#F6F6F6;font-weight:400}.mydp .markdate{position:absolute;width:4px;height:4px;border-radius:4px}.mydp .markcurrday,.mydp .markcurrmonth,.mydp .markcurryear{text-decoration:underline}.mydp .selectedday .datevalue,.mydp .selectedmonth .monthvalue,.mydp .selectedyear .yearvalue{border:none;background-color:#8EBFFF;border-radius:2px}.mydp .headerbtncell{background-color:#FAFAFA}.mydp .yearchangebtncell{text-align:center;background-color:#FAFAFA}.mydp .headerbtn,.mydp .headerlabelbtn,.mydp .yearchangebtn{background:#FAFAFA;border:none;height:22px}.mydp .headerbtn{width:16px}.mydp .headerlabelbtn{font-size:14px;outline:0;cursor:default}.mydp,.mydp .headertodaybtn{border:1px solid #CCC}.mydp .btnclear,.mydp .btndecrease,.mydp .btnincrease,.mydp .btnpicker,.mydp .headerbtn,.mydp .headermonthtxt,.mydp .headertodaybtn,.mydp .headeryeartxt,.mydp .yearchangebtn{color:#000}.mydp .headertodaybtn{padding:0 4px;font-size:11px;height:22px;min-width:60px;max-width:84px}.mydp button::-moz-focus-inner{border:0}.mydp .headermonthtxt,.mydp .headeryeartxt{text-align:center;display:table-cell;vertical-align:middle;font-size:14px;height:26px;width:40px;max-width:40px;overflow:hidden;white-space:nowrap}.mydp .btnclear:focus,.mydp .btndecrease:focus,.mydp .btnincrease:focus,.mydp .btnpicker:focus,.mydp .headertodaybtn:focus{background:#ADD8E6}.mydp .headerbtn:focus,.mydp .monthlabel:focus,.mydp .yearchangebtn:focus,.mydp .yearlabel:focus{color:#ADD8E6;outline:0}.mydp .daycell:focus,.mydp .monthcell:focus,.mydp .yearcell:focus{outline:#CCC solid 1px}.mydp .icon-mydpcalendar,.mydp .icon-mydpremove{font-size:16px}.mydp .icon-mydpdown,.mydp .icon-mydpleft,.mydp .icon-mydpright,.mydp .icon-mydpup{color:#222;font-size:20px}.mydp .btndecrease .icon-mydpleft,.mydp .btnincrease .icon-mydpright{font-size:16px}.mydp .icon-mydptoday{color:#222;font-size:11px}.mydp table{display:table;border-spacing:0}.mydp table td{padding:0}.mydp table,.mydp td,.mydp th{border:none}.mydp .btnclearenabled:hover,.mydp .btndecreaseenabled:hover,.mydp .btnincreaseenabled:hover,.mydp .btnpickerenabled:hover,.mydp .headertodaybtnenabled:hover{background-color:#E6E6E6}.mydp .tablesingleday:hover,.mydp .tablesinglemonth:hover,.mydp .tablesingleyear:hover{background-color:#DDD}.mydp .daycell,.mydp .inputnoteditable,.mydp .monthcell,.mydp .monthlabel,.mydp .yearcell,.mydp .yearlabel{cursor:pointer}.mydp .headerbtnenabled:hover,.mydp .monthlabel:hover,.mydp .yearchangebtnenabled:hover,.mydp .yearlabel:hover{color:#777}@font-face{font-family:mydatepicker;src:url(data:application/octet-stream;base64,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) format('truetype');font-weight:400;font-style:normal}.mydp .mydpicon{font-family:mydatepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mydp .icon-mydpright:before{content:\"\\e800\"}.mydp .icon-mydpleft:before{content:\"\\e801\"}.mydp .icon-mydptoday:before{content:\"\\e802\"}.mydp .icon-mydpcalendar:before{content:\"\\e803\"}.mydp .icon-mydpup:before{content:\"\\e804\"}.mydp .icon-mydpdown:before{content:\"\\e805\"}.mydp .icon-mydpremove:before{content:\"\\e806\"}"],
                    template: "<div class=\"mydp\" [ngStyle]=\"{'width': opts.showInputField ? opts.width : null, 'border': opts.inline ? 'none' : null}\"><div class=\"selectiongroup\" *ngIf=\"!opts.inline\"><input *ngIf=\"opts.showInputField\" #inputBoxEl ngtype=\"text\" class=\"selection\" [attr.aria-label]=\"opts.ariaLabelInputField\" (click)=\"opts.openSelectorOnInputClick&&!opts.editableDateField&&openBtnClicked()\" [ngClass]=\"{'invaliddate': invalidDate&&opts.indicateInvalidDate, 'inputnoteditable': opts.openSelectorOnInputClick&&!opts.editableDateField, 'selectiondisabled': opts.componentDisabled}\" placeholder=\"{{placeholder}}\" [ngStyle]=\"{'height': opts.height, 'font-size': opts.selectionTxtFontSize}\" [ngModel]=\"selectionDayTxt\" (ngModelChange)=\"onUserDateInput($event)\" [value]=\"selectionDayTxt\" (keyup)=\"onCloseSelector($event)\" (focus)=\"opts.editableDateField&&onFocusInput($event)\" (blur)=\"opts.editableDateField&&onBlurInput($event)\" [disabled]=\"opts.componentDisabled\" [readonly]=\"!opts.editableDateField\" autocomplete=\"off\" spellcheck=\"false\" autocorrect=\"off\"><div class=\"selbtngroup\" [style.height]=\"opts.height\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelDecreaseDate\" class=\"btndecrease\" *ngIf=\"opts.showDecreaseDateBtn\" (click)=\"onDecreaseBtnClicked()\" [ngClass]=\"{'btndecreaseenabled': !opts.componentDisabled, 'btndecreasedisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showInputField}\" [disabled]=\"opts.componentDisabled\"><span class=\"mydpicon icon-mydpleft\"></span></button> <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelIncreaseDate\" class=\"btnincrease\" *ngIf=\"opts.showIncreaseDateBtn\" (click)=\"onIncreaseBtnClicked()\" [ngClass]=\"{'btnincreaseenabled': !opts.componentDisabled, 'btnincreasedisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showDecreaseDateBtn&&!opts.showInputField}\" [disabled]=\"opts.componentDisabled\"><span class=\"mydpicon icon-mydpright\"></span></button> <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelClearDate\" class=\"btnclear\" *ngIf=\"selectionDayTxt.length>0&&opts.showClearDateBtn\" (click)=\"removeBtnClicked()\" [ngClass]=\"{'btnclearenabled': !opts.componentDisabled, 'btncleardisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showIncreaseDateBtn&&!opts.showDecreaseDateBtn&&!opts.showInputField}\" [disabled]=\"opts.componentDisabled\"><span class=\"mydpicon icon-mydpremove\"></span></button> <button type=\"button\" [attr.aria-label]=\"opts.ariaLabelOpenCalendar\" class=\"btnpicker\" (click)=\"openBtnClicked()\" [ngClass]=\"{'btnpickerenabled': !opts.componentDisabled, 'btnpickerdisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showClearDateBtn&&!opts.showIncreaseDateBtn&&!opts.showDecreaseDateBtn&&!opts.showInputField||selectionDayTxt.length===0&&!opts.showInputField}\" [disabled]=\"opts.componentDisabled\"><span class=\"mydpicon icon-mydpcalendar\"></span></button></div></div><div class=\"selector\" #selectorEl [ngStyle]=\"{'width': opts.selectorWidth, 'height' : opts.selectorHeight, 'bottom': getSelectorTopPosition()}\" *ngIf=\"showSelector||opts.inline\" [mydpfocus]=\"opts.inline?'0':'1'\" [ngClass]=\"{'inlinedp': opts.inline, 'alignselectorright': opts.alignSelectorRight, 'selectorarrow': opts.showSelectorArrow&&!opts.inline, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight&&!opts.inline, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight&&!opts.inline}\" (keyup)=\"onCloseSelector($event)\" tabindex=\"0\"><table class=\"header\"><tr><td><div style=\"float:left\"><div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelPrevMonth\" class=\"headerbtn mydpicon icon-mydpleft\" (click)=\"onPrevMonth()\" [disabled]=\"prevMonthDisabled\" [ngClass]=\"{'headerbtnenabled': !prevMonthDisabled, 'headerbtndisabled': prevMonthDisabled}\"></button></div><div class=\"headermonthtxt\"><button class=\"headerlabelbtn\" type=\"button\" [ngClass]=\"{'monthlabel': opts.monthSelector}\" (click)=\"opts.monthSelector&&onSelectMonthClicked($event)\" tabindex=\"{{opts.monthSelector?'0':'-1'}}\">{{visibleMonth.monthTxt}}</button></div><div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelNextMonth\" class=\"headerbtn mydpicon icon-mydpright\" (click)=\"onNextMonth()\" [disabled]=\"nextMonthDisabled\" [ngClass]=\"{'headerbtnenabled': !nextMonthDisabled, 'headerbtndisabled': nextMonthDisabled}\"></button></div></div></td><td><button *ngIf=\"opts.showTodayBtn\" type=\"button\" class=\"headertodaybtn\" (click)=\"onTodayClicked()\" [disabled]=\"disableTodayBtn\" [ngClass]=\"{'headertodaybtnenabled': !disableTodayBtn, 'headertodaybtndisabled': disableTodayBtn}\"><span class=\"mydpicon icon-mydptoday\"></span> <span>{{opts.todayBtnTxt}}</span></button></td><td><div style=\"float:right\"><div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelPrevYear\" class=\"headerbtn mydpicon icon-mydpleft\" (click)=\"onPrevYear()\" [disabled]=\"prevYearDisabled\" [ngClass]=\"{'headerbtnenabled': !prevYearDisabled, 'headerbtndisabled': prevYearDisabled}\"></button></div><div class=\"headeryeartxt\"><button class=\"headerlabelbtn\" type=\"button\" [ngClass]=\"{'yearlabel': opts.yearSelector}\" (click)=\"opts.yearSelector&&onSelectYearClicked($event)\" tabindex=\"{{opts.yearSelector?'0':'-1'}}\">{{visibleMonth.year}}</button></div><div class=\"headerbtncell\"><button type=\"button\" [attr.aria-label]=\"opts.ariaLabelNextYear\" class=\"headerbtn mydpicon icon-mydpright\" (click)=\"onNextYear()\" [disabled]=\"nextYearDisabled\" [ngClass]=\"{'headerbtnenabled': !nextYearDisabled, 'headerbtndisabled': nextYearDisabled}\"></button></div></div></td></tr></table><table class=\"caltable\" *ngIf=\"!selectMonth&&!selectYear\"><thead><tr><th class=\"weekdaytitle weekdaytitleweeknbr\" *ngIf=\"opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'\">#</th><th class=\"weekdaytitle\" scope=\"col\" *ngFor=\"let d of weekDays\">{{d}}</th></tr></thead><tbody><tr *ngFor=\"let w of dates\"><td class=\"daycell daycellweeknbr\" *ngIf=\"opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'\">{{w.weekNbr}}</td><td class=\"daycell\" *ngFor=\"let d of w.week\" [ngClass]=\"{'currmonth':d.cmo===currMonthId&&!d.disabled, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===currMonthId, 'disabled': d.disabled, 'tablesingleday':(!opts.allowSelectionOnlyInCurrentMonth||d.cmo===currMonthId&&opts.allowSelectionOnlyInCurrentMonth)&&!d.disabled}\" (click)=\"!d.disabled&&onCellClicked(d);$event.stopPropagation()\" (keydown)=\"onCellKeyDown($event, d)\" tabindex=\"0\"><div *ngIf=\"d.markedDate.marked\" class=\"markdate\" [ngStyle]=\"{'background-color': d.markedDate.color}\"></div><div class=\"datevalue\" [ngClass]=\"{'prevmonth':d.cmo===prevMonthId,'currmonth':d.cmo===currMonthId,'nextmonth':d.cmo===nextMonthId,'highlight':d.highlight}\"><span [ngClass]=\"{'markcurrday':d.currDay&&opts.markCurrentDay, 'dimday': d.highlight && (d.cmo===prevMonthId || d.cmo===nextMonthId || d.disabled)}\">{{d.dateObj.day}}</span></div></td></tr></tbody></table><table class=\"monthtable\" *ngIf=\"selectMonth\"><tbody><tr *ngFor=\"let mr of months\"><td class=\"monthcell tablesinglemonth\" [ngClass]=\"{'selectedmonth': m.selected, 'disabled': m.disabled}\" *ngFor=\"let m of mr\" (click)=\"!m.disabled&&onMonthCellClicked(m);$event.stopPropagation()\" (keydown)=\"onMonthCellKeyDown($event, m)\" tabindex=\"0\"><div class=\"monthvalue\" [ngClass]=\"{'markcurrmonth':m.currMonth&&opts.markCurrentMonth}\">{{m.name}}</div></td></tr></tbody></table><table class=\"yeartable\" *ngIf=\"selectYear\"><tbody><tr><td colspan=\"5\" class=\"yearchangebtncell\" (click)=\"$event.stopPropagation()\"><button type=\"button\" class=\"yearchangebtn mydpicon icon-mydpup\" (click)=\"onPrevYears($event, years[0][0].year)\" [disabled]=\"prevYearsDisabled\" [ngClass]=\"{'yearchangebtnenabled': !prevYearsDisabled, 'yearchangebtndisabled': prevYearsDisabled}\"></button></td></tr><tr *ngFor=\"let yr of years\"><td class=\"yearcell tablesingleyear\" [ngClass]=\"{'selectedyear': y.selected, 'disabled': y.disabled}\" *ngFor=\"let y of yr\" (click)=\"!y.disabled&&onYearCellClicked(y);$event.stopPropagation()\" (keydown)=\"onYearCellKeyDown($event, y)\" tabindex=\"0\"><div class=\"yearvalue\" [ngClass]=\"{'markcurryear':y.currYear&&opts.markCurrentYear}\">{{y.year}}</div></td></tr><tr><td colspan=\"5\" class=\"yearchangebtncell\" (click)=\"$event.stopPropagation()\"><button type=\"button\" class=\"yearchangebtn mydpicon icon-mydpdown\" (click)=\"onNextYears($event, years[0][0].year)\" [disabled]=\"nextYearsDisabled\" [ngClass]=\"{'yearchangebtnenabled': !nextYearsDisabled, 'yearchangebtndisabled': nextYearsDisabled}\"></button></td></tr></tbody></table></div></div>",
                    providers: [__WEBPACK_IMPORTED_MODULE_2__services_my_date_picker_locale_service__["a" /* LocaleService */], __WEBPACK_IMPORTED_MODULE_3__services_my_date_picker_util_service__["a" /* UtilService */], MYDP_VALUE_ACCESSOR],
                    encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
                },] },
    ];
    MyDatePicker.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_2__services_my_date_picker_locale_service__["a" /* LocaleService */], },
        { type: __WEBPACK_IMPORTED_MODULE_3__services_my_date_picker_util_service__["a" /* UtilService */], },
    ];
    MyDatePicker.propDecorators = {
        'options': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'locale': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'defaultMonth': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'selDate': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'placeholder': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'selector': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'disabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'dateChanged': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'inputFieldChanged': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'calendarViewChanged': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'calendarToggle': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'inputFocusBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        'selectorEl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ["selectorEl",] },],
        'inputBoxEl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ["inputBoxEl",] },],
    };
    return MyDatePicker;
}());
//# sourceMappingURL=my-date-picker.component.js.map

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var vg_fullscreen_api_1 = __webpack_require__(142);
var vg_utils_1 = __webpack_require__(143);
var vg_media_1 = __webpack_require__(201);
var vg_controls_hidden_1 = __webpack_require__(87);
var VgPlayer = (function () {
    function VgPlayer(ref, api, fsAPI, controlsHidden) {
        this.api = api;
        this.fsAPI = fsAPI;
        this.controlsHidden = controlsHidden;
        this.isFullscreen = false;
        this.isNativeFullscreen = false;
        this.areControlsHidden = false;
        this.onPlayerReady = new core_1.EventEmitter();
        this.onMediaReady = new core_1.EventEmitter();
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.api.registerElement(this.elem);
    }
    VgPlayer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.medias.toArray().forEach(function (media) {
            _this.api.registerMedia(media);
        });
        this.fsAPI.init(this.elem, this.medias);
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
        this.api.onPlayerReady(this.fsAPI);
        this.onPlayerReady.next(this.api);
    };
    VgPlayer.prototype.onChangeFullscreen = function (fsState) {
        if (!this.fsAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? vg_utils_1.VgUtils.getZIndex().toString() : 'auto';
        }
        else {
            this.isNativeFullscreen = fsState;
        }
    };
    VgPlayer.prototype.onHideControls = function (hidden) {
        this.areControlsHidden = hidden;
    };
    VgPlayer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgPlayer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-player',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "<ng-content></ng-content>",
                    styles: ["\n        vg-player {\n            font-family: 'videogular';\n            position: relative;\n            display: flex;\n            width: 100%;\n            height: 100%;\n            overflow: hidden;\n            background-color: black;\n        }\n\n        vg-player.fullscreen {\n            position: fixed;\n            left: 0;\n            top: 0;\n        }\n\n        vg-player.native-fullscreen.controls-hidden {\n            cursor: none;\n        }\n    "],
                    providers: [vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_controls_hidden_1.VgControlsHidden]
                },] },
    ];
    /** @nocollapse */
    VgPlayer.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
        { type: vg_fullscreen_api_1.VgFullscreenAPI, },
        { type: vg_controls_hidden_1.VgControlsHidden, },
    ]; };
    VgPlayer.propDecorators = {
        "isFullscreen": [{ type: core_1.HostBinding, args: ['class.fullscreen',] },],
        "isNativeFullscreen": [{ type: core_1.HostBinding, args: ['class.native-fullscreen',] },],
        "areControlsHidden": [{ type: core_1.HostBinding, args: ['class.controls-hidden',] },],
        "zIndex": [{ type: core_1.HostBinding, args: ['style.z-index',] },],
        "onPlayerReady": [{ type: core_1.Output },],
        "onMediaReady": [{ type: core_1.Output },],
        "medias": [{ type: core_1.ContentChildren, args: [vg_media_1.VgMedia,] },],
    };
    return VgPlayer;
}());
exports.VgPlayer = VgPlayer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBU3VCO0FBQ3ZCLDZDQUEyQztBQUMzQyxtRUFBZ0U7QUFDaEUsaURBQStDO0FBQy9DLGlEQUErQztBQUUvQyxxRUFBa0U7O0lBZ0Q5RCxrQkFBWSxHQUFlLEVBQVMsR0FBVSxFQUFTLEtBQXNCLEVBQVUsY0FBZ0M7UUFBbkYsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUFTLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWtCOzRCQWhCOUQsS0FBSztrQ0FDUSxLQUFLO2lDQUNSLEtBQUs7NkJBSXJDLElBQUksbUJBQVksRUFBRTs0QkFHbkIsSUFBSSxtQkFBWSxFQUFFOzZCQUtwQixFQUFFO1FBRzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkM7SUFFRCxxQ0FBa0IsR0FBbEI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUNoQyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDckM7SUFFRCxxQ0FBa0IsR0FBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxrQkFBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQztTQUNuRTtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQztTQUNyQztLQUNKO0lBRUQsaUNBQWMsR0FBZCxVQUFlLE1BQWU7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztLQUNuQztJQUVELDhCQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztLQUNwRDs7Z0JBakZKLGdCQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxNQUFNLEVBQUUsQ0FBRSw0ZEFvQlQsQ0FBRTtvQkFDSCxTQUFTLEVBQUUsQ0FBRSxjQUFLLEVBQUUsbUNBQWUsRUFBRSxxQ0FBZ0IsQ0FBRTtpQkFDMUQ7Ozs7Z0JBdkNHLGlCQUFVO2dCQU1MLGNBQUs7Z0JBQ0wsbUNBQWU7Z0JBSWYscUNBQWdCOzs7aUNBZ0NwQixrQkFBVyxTQUFDLGtCQUFrQjt1Q0FDOUIsa0JBQVcsU0FBQyx5QkFBeUI7c0NBQ3JDLGtCQUFXLFNBQUMsdUJBQXVCOzJCQUNuQyxrQkFBVyxTQUFDLGVBQWU7a0NBRTNCLGFBQU07aUNBR04sYUFBTTsyQkFHTixzQkFBZSxTQUFDLGtCQUFPOzttQkExRDVCOztBQTRDYSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgT3V0cHV0LFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgRWxlbWVudFJlZixcbiAgICBIb3N0QmluZGluZyxcbiAgICBRdWVyeUxpc3QsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb250ZW50Q2hpbGRyZW4sIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ0Z1bGxzY3JlZW5BUEkgfSBmcm9tICcuLi9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaSc7XG5pbXBvcnQgeyBWZ1V0aWxzIH0gZnJvbSAnLi4vc2VydmljZXMvdmctdXRpbHMnO1xuaW1wb3J0IHsgVmdNZWRpYSB9IGZyb20gJy4uL3ZnLW1lZGlhL3ZnLW1lZGlhJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFZnQ29udHJvbHNIaWRkZW4gfSBmcm9tICcuLi9zZXJ2aWNlcy92Zy1jb250cm9scy1oaWRkZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ZnLXBsYXllcicsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlczogWyBgXG4gICAgICAgIHZnLXBsYXllciB7XG4gICAgICAgICAgICBmb250LWZhbWlseTogJ3ZpZGVvZ3VsYXInO1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctcGxheWVyLmZ1bGxzY3JlZW4ge1xuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLXBsYXllci5uYXRpdmUtZnVsbHNjcmVlbi5jb250cm9scy1oaWRkZW4ge1xuICAgICAgICAgICAgY3Vyc29yOiBub25lO1xuICAgICAgICB9XG4gICAgYCBdLFxuICAgIHByb3ZpZGVyczogWyBWZ0FQSSwgVmdGdWxsc2NyZWVuQVBJLCBWZ0NvbnRyb2xzSGlkZGVuIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdQbGF5ZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIGVsZW06IEhUTUxFbGVtZW50O1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mdWxsc2NyZWVuJykgaXNGdWxsc2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYXRpdmUtZnVsbHNjcmVlbicpIGlzTmF0aXZlRnVsbHNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuY29udHJvbHMtaGlkZGVuJykgYXJlQ29udHJvbHNIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLnotaW5kZXgnKSB6SW5kZXg6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIG9uUGxheWVyUmVhZHk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgb25NZWRpYVJlYWR5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oVmdNZWRpYSlcbiAgICBtZWRpYXM6IFF1ZXJ5TGlzdDxWZ01lZGlhPjtcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBhcGk6IFZnQVBJLCBwdWJsaWMgZnNBUEk6IFZnRnVsbHNjcmVlbkFQSSwgcHJpdmF0ZSBjb250cm9sc0hpZGRlbjogVmdDb250cm9sc0hpZGRlbikge1xuICAgICAgICB0aGlzLmVsZW0gPSByZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLmFwaS5yZWdpc3RlckVsZW1lbnQodGhpcy5lbGVtKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMubWVkaWFzLnRvQXJyYXkoKS5mb3JFYWNoKChtZWRpYSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcGkucmVnaXN0ZXJNZWRpYShtZWRpYSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZnNBUEkuaW5pdCh0aGlzLmVsZW0sIHRoaXMubWVkaWFzKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmZzQVBJLm9uQ2hhbmdlRnVsbHNjcmVlbi5zdWJzY3JpYmUodGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4uYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmNvbnRyb2xzSGlkZGVuLmlzSGlkZGVuLnN1YnNjcmliZSh0aGlzLm9uSGlkZUNvbnRyb2xzLmJpbmQodGhpcykpKTtcblxuICAgICAgICB0aGlzLmFwaS5vblBsYXllclJlYWR5KHRoaXMuZnNBUEkpO1xuICAgICAgICB0aGlzLm9uUGxheWVyUmVhZHkubmV4dCh0aGlzLmFwaSk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VGdWxsc2NyZWVuKGZzU3RhdGU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmZzQVBJLm5hdGl2ZUZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNGdWxsc2NyZWVuID0gZnNTdGF0ZTtcbiAgICAgICAgICAgIHRoaXMuekluZGV4ID0gZnNTdGF0ZSA/IFZnVXRpbHMuZ2V0WkluZGV4KCkudG9TdHJpbmcoKSA6ICdhdXRvJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNOYXRpdmVGdWxsc2NyZWVuID0gZnNTdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSGlkZUNvbnRyb2xzKGhpZGRlbjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmFyZUNvbnRyb2xzSGlkZGVuID0gaGlkZGVuO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_events_1 = __webpack_require__(202);
var Observable_1 = __webpack_require__(0);
__webpack_require__(136);
var VgCuePoints = (function () {
    function VgCuePoints(ref) {
        this.ref = ref;
        this.onEnterCuePoint = new core_1.EventEmitter();
        this.onUpdateCuePoint = new core_1.EventEmitter();
        this.onExitCuePoint = new core_1.EventEmitter();
        this.onCompleteCuePoint = new core_1.EventEmitter();
        this.subscriptions = [];
        this.cuesSubscriptions = [];
        this.totalCues = 0;
    }
    VgCuePoints.prototype.ngOnInit = function () {
        var onLoad = Observable_1.Observable.fromEvent(this.ref.nativeElement, vg_events_1.VgEvents.VG_LOAD);
        this.subscriptions.push(onLoad.subscribe(this.onLoad.bind(this)));
    };
    VgCuePoints.prototype.onLoad = function (event) {
        var cues = event.target.track.cues;
        this.ref.nativeElement.cues = cues;
        this.updateCuePoints(cues);
    };
    VgCuePoints.prototype.updateCuePoints = function (cues) {
        this.cuesSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        for (var i = 0, l = cues.length; i < l; i++) {
            var onEnter = Observable_1.Observable.fromEvent(cues[i], vg_events_1.VgEvents.VG_ENTER);
            this.cuesSubscriptions.push(onEnter.subscribe(this.onEnter.bind(this)));
            var onExit = Observable_1.Observable.fromEvent(cues[i], vg_events_1.VgEvents.VG_EXIT);
            this.cuesSubscriptions.push(onExit.subscribe(this.onExit.bind(this)));
        }
    };
    VgCuePoints.prototype.onEnter = function (event) {
        this.onEnterCuePoint.next(event.target);
    };
    VgCuePoints.prototype.onExit = function (event) {
        this.onExitCuePoint.next(event.target);
    };
    VgCuePoints.prototype.ngDoCheck = function () {
        if (this.ref.nativeElement.cues) {
            var changes = this.totalCues !== this.ref.nativeElement.track.cues.length;
            if (changes) {
                this.totalCues = this.ref.nativeElement.track.cues.length;
                this.ref.nativeElement.cues = this.ref.nativeElement.track.cues;
                this.updateCuePoints(this.ref.nativeElement.track.cues);
            }
        }
    };
    VgCuePoints.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgCuePoints.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[vgCuePoints]'
                },] },
    ];
    /** @nocollapse */
    VgCuePoints.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    VgCuePoints.propDecorators = {
        "onEnterCuePoint": [{ type: core_1.Output, args: ['onEnterCuePoint',] },],
        "onUpdateCuePoint": [{ type: core_1.Output, args: ['onUpdateCuePoint',] },],
        "onExitCuePoint": [{ type: core_1.Output, args: ['onExitCuePoint',] },],
        "onCompleteCuePoint": [{ type: core_1.Output, args: ['onCompleteCuePoint',] },],
    };
    return VgCuePoints;
}());
exports.VgCuePoints = VgCuePoints;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY3VlLXBvaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLWN1ZS1wb2ludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Y7QUFDL0YsaURBQStDO0FBQy9DLDhDQUE2QztBQUM3Qyx5Q0FBdUM7O0lBaUJuQyxxQkFBbUIsR0FBZTtRQUFmLFFBQUcsR0FBSCxHQUFHLENBQVk7K0JBVjhCLElBQUksbUJBQVksRUFBRTtnQ0FDaEIsSUFBSSxtQkFBWSxFQUFFOzhCQUN0QixJQUFJLG1CQUFZLEVBQUU7a0NBQ1YsSUFBSSxtQkFBWSxFQUFFOzZCQUV4RCxFQUFFO2lDQUNFLEVBQUU7eUJBRTFCLENBQUM7S0FHWjtJQUVELDhCQUFRLEdBQVI7UUFDSSxJQUFJLE1BQU0sR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxvQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JFO0lBRUQsNEJBQU0sR0FBTixVQUFPLEtBQVU7UUFDYixJQUFJLElBQUksR0FBbUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRW5ELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtJQUVELHFDQUFlLEdBQWYsVUFBZ0IsSUFBb0I7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztRQUVyRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLElBQUksT0FBTyxHQUFHLHVCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUUsRUFBRSxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEUsSUFBSSxNQUFNLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBRSxFQUFFLG9CQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RTtLQUNKO0lBRUQsNkJBQU8sR0FBUCxVQUFRLEtBQVU7UUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0M7SUFFRCw0QkFBTSxHQUFOLFVBQU8sS0FBVTtRQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFNUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDaEUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0Q7U0FDSjtLQUNKO0lBRUQsaUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0tBQ3BEOztnQkFoRUosZ0JBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtpQkFDNUI7Ozs7Z0JBUm1CLGlCQUFVOzs7b0NBVXpCLGFBQU0sU0FBQyxpQkFBaUI7cUNBQ3hCLGFBQU0sU0FBQyxrQkFBa0I7bUNBQ3pCLGFBQU0sU0FBQyxnQkFBZ0I7dUNBQ3ZCLGFBQU0sU0FBQyxvQkFBb0I7O3NCQWJoQzs7QUFTYSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ0V2ZW50cyB9IGZyb20gJy4uL2V2ZW50cy92Zy1ldmVudHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdmdDdWVQb2ludHNdJ1xufSlcbmV4cG9ydCBjbGFzcyBWZ0N1ZVBvaW50cyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBAT3V0cHV0KCdvbkVudGVyQ3VlUG9pbnQnKSBvbkVudGVyQ3VlUG9pbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ29uVXBkYXRlQ3VlUG9pbnQnKSBvblVwZGF0ZUN1ZVBvaW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkV4aXRDdWVQb2ludCcpIG9uRXhpdEN1ZVBvaW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdvbkNvbXBsZXRlQ3VlUG9pbnQnKSBvbkNvbXBsZXRlQ3VlUG9pbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgICBjdWVzU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIHRvdGFsQ3VlcyA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGxldCBvbkxvYWQgPSBPYnNlcnZhYmxlLmZyb21FdmVudCh0aGlzLnJlZi5uYXRpdmVFbGVtZW50LCBWZ0V2ZW50cy5WR19MT0FEKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gob25Mb2FkLnN1YnNjcmliZSh0aGlzLm9uTG9hZC5iaW5kKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgb25Mb2FkKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IGN1ZXM6IFRleHRUcmFja0N1ZVtdID0gZXZlbnQudGFyZ2V0LnRyYWNrLmN1ZXM7XG5cbiAgICAgICAgdGhpcy5yZWYubmF0aXZlRWxlbWVudC5jdWVzID0gY3VlcztcblxuICAgICAgICB0aGlzLnVwZGF0ZUN1ZVBvaW50cyhjdWVzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDdWVQb2ludHMoY3VlczogVGV4dFRyYWNrQ3VlW10pIHtcbiAgICAgICAgdGhpcy5jdWVzU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGN1ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb25FbnRlciA9IE9ic2VydmFibGUuZnJvbUV2ZW50KGN1ZXNbIGkgXSwgVmdFdmVudHMuVkdfRU5URVIpO1xuICAgICAgICAgICAgdGhpcy5jdWVzU3Vic2NyaXB0aW9ucy5wdXNoKG9uRW50ZXIuc3Vic2NyaWJlKHRoaXMub25FbnRlci5iaW5kKHRoaXMpKSk7XG5cbiAgICAgICAgICAgIGxldCBvbkV4aXQgPSBPYnNlcnZhYmxlLmZyb21FdmVudChjdWVzWyBpIF0sIFZnRXZlbnRzLlZHX0VYSVQpO1xuICAgICAgICAgICAgdGhpcy5jdWVzU3Vic2NyaXB0aW9ucy5wdXNoKG9uRXhpdC5zdWJzY3JpYmUodGhpcy5vbkV4aXQuYmluZCh0aGlzKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25FbnRlcihldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMub25FbnRlckN1ZVBvaW50Lm5leHQoZXZlbnQudGFyZ2V0KTtcbiAgICB9XG5cbiAgICBvbkV4aXQoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLm9uRXhpdEN1ZVBvaW50Lm5leHQoZXZlbnQudGFyZ2V0KTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmN1ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLnRvdGFsQ3VlcyAhPT0gdGhpcy5yZWYubmF0aXZlRWxlbWVudC50cmFjay5jdWVzLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQ3VlcyA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQudHJhY2suY3Vlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWYubmF0aXZlRWxlbWVudC5jdWVzID0gdGhpcy5yZWYubmF0aXZlRWxlbWVudC50cmFjay5jdWVzO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VlUG9pbnRzKHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQudHJhY2suY3Vlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbn1cbiJdfQ==

/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var public_1 = __webpack_require__(88);
var newsRequest_1 = __webpack_require__(374);
var page_1 = __webpack_require__(38);
var news_1 = __webpack_require__(203);
var Home = (function () {
    function Home(toastr, vcr, home, pageService, newsService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        this.newsService = newsService;
        this.isNews = false;
        var self = this;
        self.getNews();
    }
    Home.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(1);
        var slides = document.querySelectorAll('#slides .slide');
        var currentSlide = 0;
        var slideInterval = setInterval(nextSlide, 5000);
        function nextSlide() {
            slides[currentSlide].className = 'slide';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].className = 'slide showing';
        }
    };
    Home.prototype.showImg = function (url, index) {
        var self = this;
        document.getElementById("display" + index).style.backgroundImage = url;
    };
    Home.prototype.getNews = function () {
        var self = this;
        self.busy = self.newsService.GetNewsTop(new newsRequest_1.TopRequest(true)).then(function (response) {
            self.newss = response.news;
            self.isNews = self.newss.length > 0 ? true : false;
        });
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: __webpack_require__(921)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService,
            news_1.NewsService])
    ], Home);
    return Home;
}());
exports.Home = Home;


/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TopRequest = (function () {
    function TopRequest(top) {
        this.top = top;
    }
    return TopRequest;
}());
exports.TopRequest = TopRequest;


/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var public_1 = __webpack_require__(88);
var page_1 = __webpack_require__(38);
var Comand = (function () {
    function Comand(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
    }
    Comand.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(3);
        self.getCommand();
    };
    Comand.prototype.getCommand = function () {
        var self = this;
        self.busy = self.home.GetCommand().then(function (response) {
            self.commands = response.commands;
        });
    };
    Comand = __decorate([
        core_1.Component({
            selector: 'command',
            template: __webpack_require__(922)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService])
    ], Comand);
    return Comand;
}());
exports.Comand = Comand;


/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var page_1 = __webpack_require__(38);
var CurrentTournaments = (function () {
    function CurrentTournaments(toastr, vcr, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.pageService = pageService;
    }
    CurrentTournaments.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(2);
    };
    CurrentTournaments = __decorate([
        core_1.Component({
            selector: 'current-tournaments',
            template: __webpack_require__(923)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            page_1.PageService])
    ], CurrentTournaments);
    return CurrentTournaments;
}());
exports.CurrentTournaments = CurrentTournaments;


/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var page_1 = __webpack_require__(38);
var turnament_1 = __webpack_require__(378);
var command_1 = __webpack_require__(924);
var elementtRequest_1 = __webpack_require__(379);
var NewTournaments = (function () {
    function NewTournaments(toastr, vcr, pageService, turnamentService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.pageService = pageService;
        this.turnamentService = turnamentService;
        this.isChecked = false;
        this.isTur = false;
    }
    NewTournaments.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(2);
        self.getTournaments();
    };
    NewTournaments.prototype.getTournaments = function () {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentsForUser().then(function (response) {
            self.turnaments = response.turnaments;
            self.isTur = self.turnaments.length > 0;
            self.isChecked = self.turnaments.length < 2;
        });
    };
    NewTournaments.prototype.declareTournament = function (id, index) {
        var self = this;
        self.busy = self.turnamentService.DeclareTournament(new elementtRequest_1.ElementRequest(id)).then(function (response) {
            self.turnaments[index].commands.push(new command_1.CommandForTurnament(null, response.txt, false));
            self.toastr.success("Заявка подана");
        });
    };
    NewTournaments = __decorate([
        core_1.Component({
            selector: 'new-tournaments',
            template: __webpack_require__(925)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            page_1.PageService,
            turnament_1.TurnamentService])
    ], NewTournaments);
    return NewTournaments;
}());
exports.NewTournaments = NewTournaments;


/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var TurnamentService = (function () {
    function TurnamentService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    TurnamentService.prototype.GetTurnamentsForUser = function () {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentsForUser, null);
    };
    TurnamentService.prototype.DeclareTournament = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.declareTournament, request);
    };
    TurnamentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], TurnamentService);
    return TurnamentService;
}());
exports.TurnamentService = TurnamentService;


/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ElementRequest = (function () {
    function ElementRequest(txt) {
        this.txt = txt;
    }
    return ElementRequest;
}());
exports.ElementRequest = ElementRequest;


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var PageService = (function () {
    function PageService() {
        this.recipeSelected = new core_1.EventEmitter();
        this.account = 1;
    }
    return PageService;
}());
exports.PageService = PageService;


/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var page_1 = __webpack_require__(38);
var PastTournaments = (function () {
    function PastTournaments(toastr, vcr, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.pageService = pageService;
    }
    PastTournaments.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(2);
    };
    PastTournaments = __decorate([
        core_1.Component({
            selector: 'past-tournaments',
            template: __webpack_require__(926)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            page_1.PageService])
    ], PastTournaments);
    return PastTournaments;
}());
exports.PastTournaments = PastTournaments;


/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var router_1 = __webpack_require__(64);
var http_1 = __webpack_require__(55);
var page_1 = __webpack_require__(38);
var account_1 = __webpack_require__(382);
var authentication_1 = __webpack_require__(204);
var image_1 = __webpack_require__(383);
var account_2 = __webpack_require__(927);
var common_1 = __webpack_require__(73);
var elementtRequest_1 = __webpack_require__(379);
var Cabinet = (function () {
    function Cabinet(toastr, pageService, accountService, imgService, authenticationService, router, http) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.accountService = accountService;
        this.imgService = imgService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.http = http;
        this.isEdit = true;
        this.idPlayer = null;
        this.index = null;
        var self = this;
        self.account = new account_2.Account(null, null, null, null, null);
        self.chengeAccount = new account_2.Account(null, null, null, null, null);
        self.player = new account_2.Player(null, null, null, null, null);
        self.chengePlayer = new Array();
    }
    Cabinet.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(0);
        self.getAccount();
        self.isAccount();
    };
    Cabinet.prototype.isAccount = function () {
        var self = this;
        self.busy = self.authenticationService.GetAccount().then(function (response) {
            if (!response.isAuth)
                self.router.navigate([common_1.Common.RoutePaths.Home], { queryParams: {} });
        });
    };
    Cabinet.prototype.getAccount = function () {
        var self = this;
        self.busy = self.accountService.GetAccount().then(function (response) {
            self.account = response;
        });
    };
    Cabinet.prototype.openFormAddPlayer = function () {
        var self = this;
        document.getElementById("transparent-layer-player").style.display = "block";
    };
    Cabinet.prototype.close = function () {
        document.getElementById("transparent-layer-player").style.display = "none";
    };
    Cabinet.prototype.addPlayerBlockStyle = function () {
        var self = this;
        var top = (window.outerHeight - 500) / 2;
        return {
            "margin-top": top + "px"
        };
    };
    Cabinet.prototype.addPlayer = function (isValid, isPattern) {
        var self = this;
        if (isValid) {
            if (isPattern) {
                self.toastr.error("Номер игрока должен быть числом");
                return;
            }
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        self.busy = self.accountService.AddPlayer(self.player).then(function (response) {
            self.player.playerId = response.txt;
            self.account.command.push(self.player);
            self.close();
            self.player = new account_2.Player(null, null, null, null, null);
            self.sortPlayer();
            self.toastr.success("Игрок добавлен");
        });
    };
    Cabinet.prototype.selectPlayer = function (id, i) {
        var self = this;
        self.idPlayer = id;
        self.index = i;
    };
    Cabinet.prototype.dellPlayer = function () {
        var self = this;
        if (self.idPlayer == null && self.index == null)
            return;
        self.busy = self.accountService.DellPlayer(new elementtRequest_1.ElementRequest(self.idPlayer)).then(function (response) {
            self.account.command.splice(self.index, 1);
            self.idPlayer = null;
            self.index = null;
            self.toastr.success("Игрок удален");
        });
    };
    Cabinet.prototype.avatarChanged = function (e) {
        var self = this;
        var target = e.target;
        var img = target.files[0];
        var formData = new FormData();
        formData.append("image", img, img.name);
        self.busy = self.imgService.AddImageAvatar(formData).then(function (response) {
            self.account.photo = response.txt;
            self.toastr.success("Изображение загружено");
        });
    };
    Cabinet.prototype.editAccountInfo = function (isEdit) {
        var self = this;
        self.isEdit = !isEdit;
        if (isEdit) {
            document.getElementById("editButton").innerText = "Сохранить";
            return;
        }
        document.getElementById("editButton").innerText = "Редактировать";
        self.chengeAccount.name = self.account.name;
        self.chengeAccount.phone = self.account.phone;
        self.chengeAccount.email = self.account.email;
        self.chengeAccount.command = self.chengePlayer;
        self.busy = self.accountService.EditAccountInfo(self.chengeAccount).then(function (response) {
            self.chengePlayer = new Array();
            document.getElementById("exit1").innerText = self.account.name;
            self.sortPlayer();
            self.toastr.success("Сохранено");
        });
    };
    Cabinet.prototype.changeInfoPlayer = function (player, isPattern) {
        var self = this;
        if (isPattern) {
            self.toastr.error("Номер должен быть числом");
            return;
        }
        self.chengePlayer.push(player);
    };
    Cabinet.prototype.sortPlayer = function () {
        var self = this;
        self.account.command.sort(function (a, b) { return a.number <= b.number ? -1 : 1; });
    };
    Cabinet = __decorate([
        core_1.Component({
            selector: 'cabinet',
            template: __webpack_require__(928)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            account_1.AccountService,
            image_1.ImageService,
            authentication_1.AuthenticationService,
            router_1.Router,
            http_1.Http])
    ], Cabinet);
    return Cabinet;
}());
exports.Cabinet = Cabinet;


/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var AccountService = (function () {
    function AccountService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    AccountService.prototype.GetAccount = function () {
        var self = this;
        return this.tranport.postData(self.urls.getAccount, null);
    };
    AccountService.prototype.AddPlayer = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.addPlayer, request);
    };
    AccountService.prototype.DellPlayer = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.dellPlayer, request);
    };
    AccountService.prototype.EditAccountInfo = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.editAccountInfo, request);
    };
    AccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;


/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var ImageService = (function () {
    function ImageService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    ImageService.prototype.AddImageAvatar = function (request) {
        var self = this;
        return self.tranport.postDataImg(self.urls.addImageAvatar, request);
    };
    ImageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], ImageService);
    return ImageService;
}());
exports.ImageService = ImageService;


/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var news_1 = __webpack_require__(203);
var page_1 = __webpack_require__(38);
var newsRequest_1 = __webpack_require__(374);
var News = (function () {
    function News(toastr, vcr, newsService, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.newsService = newsService;
        this.pageService = pageService;
        var self = this;
        self.getNews();
    }
    News.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(4);
    };
    News.prototype.showImg = function (url, index) {
        var self = this;
        document.getElementById("display" + index).style.backgroundImage = url;
    };
    News.prototype.getNews = function () {
        var self = this;
        self.busy = self.newsService.GetNewsActive(new newsRequest_1.TopRequest(false)).then(function (response) {
            self.newss = response.news;
        });
    };
    News = __decorate([
        core_1.Component({
            selector: 'news',
            template: __webpack_require__(929)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            news_1.NewsService,
            page_1.PageService])
    ], News);
    return News;
}());
exports.News = News;


/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var public_1 = __webpack_require__(88);
var page_1 = __webpack_require__(38);
var photo_1 = __webpack_require__(930);
var photoRequest_1 = __webpack_require__(931);
var photoResponse_1 = __webpack_require__(932);
var Photo = (function () {
    function Photo(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        this.pagePhotos = new photoResponse_1.GetPhotoResponse(null, null, null);
        this.display = new photo_1.Display(null, null);
        this.pageSize = new Array();
        var self = this;
        self.getPhoto(1);
        self.getCommandFilter();
    }
    Photo.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(5);
    };
    Photo.prototype.getPhoto = function (page) {
        var self = this;
        self.busy = self.home.GetPhoto(new photoRequest_1.GetPhotoRequest(page, self.commandId)).then(function (response) {
            self.pagePhotos = response;
            self.pageSize = new Array();
            for (var i = 2; i < self.pagePhotos.pageSize; i++) {
                self.pageSize.push(i);
            }
        });
    };
    Photo.prototype.getCommandFilter = function () {
        var self = this;
        self.busy = self.home.GetCommandFilter().then(function (response) {
            self.commandFilter = response.commandFilter;
        });
    };
    Photo.prototype.filterCommand = function (id, checked) {
        var self = this;
        if (checked) {
            self.commandId = id;
            self.getPhoto(self.pagePhotos.currentPage);
        }
        else {
            self.commandId = null;
            self.getPhoto(self.pagePhotos.currentPage);
        }
    };
    Photo.prototype.photoShowStyle = function () {
        var self = this;
        var top = (window.outerHeight - 700) / 2;
        return {
            "margin-top": top + "px"
        };
    };
    Photo.prototype.pageStyle = function (page) {
        var self = this;
        if ((self.pagePhotos.currentPage + 2 < page || self.pagePhotos.currentPage - 2 > page) && (page != self.pagePhotos.pageSize && page != 1))
            return {
                "display": "none"
            };
        if (self.pagePhotos.currentPage == page)
            return {
                "color": "#00ff2d",
                "font-size": "20px"
            };
    };
    Photo.prototype.openPhoto = function (url, position) {
        var self = this;
        self.display.url = url;
        self.display.position = position;
        document.getElementById("photo-layer").style.display = "block";
    };
    Photo.prototype.closePhoto = function () {
        document.getElementById("photo-layer").style.display = "none";
    };
    Photo.prototype.nextLeftPhoto = function () {
        var self = this;
        if (self.display.position <= 0)
            self.display.position = self.pagePhotos.photos.length - 1;
        else
            self.display.position--;
        self.display.url = self.pagePhotos.photos[self.display.position];
    };
    Photo.prototype.nextRightPhoto = function () {
        var self = this;
        if (self.display.position >= self.pagePhotos.photos.length - 1)
            self.display.position = 0;
        else
            self.display.position++;
        self.display.url = self.pagePhotos.photos[self.display.position];
    };
    Photo.prototype.nextLeftPage = function () {
        var self = this;
        if (self.pagePhotos.currentPage <= 1)
            return;
        self.getPhoto(self.pagePhotos.currentPage - 1);
    };
    Photo.prototype.nextRightPage = function () {
        var self = this;
        if (self.pagePhotos.pageSize < self.pagePhotos.currentPage + 1)
            return;
        self.getPhoto(self.pagePhotos.currentPage + 1);
    };
    Photo.prototype.getPage = function (page) {
        var self = this;
        if (self.pagePhotos.currentPage == page)
            return;
        self.getPhoto(page);
    };
    Photo = __decorate([
        core_1.Component({
            selector: 'photo',
            template: __webpack_require__(933)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService])
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;


/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var router_1 = __webpack_require__(64);
var http_1 = __webpack_require__(55);
var page_1 = __webpack_require__(38);
var authentication_1 = __webpack_require__(387);
var common_1 = __webpack_require__(73);
var login_1 = __webpack_require__(934);
var authorizationRequest_1 = __webpack_require__(388);
var Login = (function () {
    function Login(toastr, pageService, router, http, authenticationService) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.router = router;
        this.http = http;
        this.authenticationService = authenticationService;
        this.loginAdmin = new login_1.LoginAdmin(null, null);
        var self = this;
    }
    Login.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(7);
        self.pageService.recipeSelected.subscribe(function (page) {
            self.page = page;
        });
        self.isAuth();
    };
    Login.prototype.isAuth = function () {
        var self = this;
        self.authenticationService.IsAuth().then(function (response) {
            self.isAuthAdmin = response.isAuth;
            if (!self.isAuthAdmin)
                self.router.navigate([common_1.Common.RoutePaths.Admin], { queryParams: {} });
            else
                self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.News], { queryParams: {} });
        });
    };
    Login.prototype.signIn = function (isPass) {
        var self = this;
        var self = this;
        if (isPass) {
            self.toastr.error("Минимальная длинна пароля 6 символов");
            return;
        }
        if (self.loginAdmin.login == null || self.loginAdmin.password == null || self.loginAdmin.login == "" || self.loginAdmin.password == "") {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        self.busy = self.authenticationService.SignInAdmin(new authorizationRequest_1.AuthorizationRequest(self.loginAdmin.login, self.loginAdmin.password)).then(function (response) {
            self.isAuthAdmin = true;
            self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.News], { queryParams: {} });
            self.toastr.info("Добро пожаловть!", response);
        });
    };
    Login.prototype.signOutAdmin = function () {
        var self = this;
        self.busy = self.authenticationService.SignOutAdmin().then(function (response) {
            self.toastr.info("До свидания!");
            self.isAuthAdmin = false;
            self.router.navigate([common_1.Common.RoutePaths.Admin], { queryParams: {} });
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            template: __webpack_require__(935)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            router_1.Router,
            http_1.Http,
            authentication_1.AuthenticationAdminService])
    ], Login);
    return Login;
}());
exports.Login = Login;


/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var AuthenticationAdminService = (function () {
    function AuthenticationAdminService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    AuthenticationAdminService.prototype.SignInAdmin = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.signInAdmin, request);
    };
    AuthenticationAdminService.prototype.IsAuth = function () {
        var self = this;
        return this.tranport.postData(self.urls.isAuth, null);
    };
    AuthenticationAdminService.prototype.SignOutAdmin = function () {
        var self = this;
        return this.tranport.postData(self.urls.signOutAdmin, null);
    };
    AuthenticationAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], AuthenticationAdminService);
    return AuthenticationAdminService;
}());
exports.AuthenticationAdminService = AuthenticationAdminService;


/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AuthorizationRequest = (function () {
    function AuthorizationRequest(login, password) {
        var self = this;
        self.login = login;
        self.password = password;
    }
    return AuthorizationRequest;
}());
exports.AuthorizationRequest = AuthorizationRequest;


/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var router_1 = __webpack_require__(64);
var http_1 = __webpack_require__(55);
var page_1 = __webpack_require__(38);
var news_1 = __webpack_require__(205);
var common_1 = __webpack_require__(73);
var ElementRequest_1 = __webpack_require__(144);
var NewsAdmin = (function () {
    function NewsAdmin(toastr, pageService, newsService, router, http) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.newsService = newsService;
        this.router = router;
        this.http = http;
        this.isText = false;
        this.isPhoto = false;
        this.isVideo = false;
        this.idNews = null;
        this.index = null;
        var self = this;
    }
    NewsAdmin.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(8);
        self.getNewsInfo();
    };
    NewsAdmin.prototype.getNewsInfo = function () {
        var self = this;
        self.busy = self.newsService.GetNewsInfo().then(function (response) {
            self.newsInfo = response.news;
        });
    };
    NewsAdmin.prototype.addNews = function () {
        var self = this;
        if (!self.isText && !self.isPhoto && !self.isVideo) {
            self.toastr.error("Не выбран тип новости");
            return;
        }
        self.busy = self.newsService.AddNews(new ElementRequest_1.ElementRequest((self.isText ? 1 : self.isPhoto ? 2 : 3).toString())).then(function (response) {
            self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.EditNews], {
                queryParams: {
                    key: response.txt
                }
            });
        });
    };
    NewsAdmin.prototype.selectNews = function (id, i) {
        var self = this;
        self.idNews = id;
        self.index = i;
    };
    NewsAdmin.prototype.dellNews = function () {
        var self = this;
        if (self.idNews == null && self.index == null)
            return;
        self.busy = self.newsService.DellNews(new ElementRequest_1.ElementRequest(self.idNews)).then(function (response) {
            self.newsInfo.splice(self.index, 1);
            self.idNews = null;
            self.index = null;
            self.toastr.success("Новость удалена");
        });
    };
    NewsAdmin.prototype.editNews = function (id) {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + "/" + common_1.Common.RoutePaths.EditNews], {
            queryParams: {
                key: id
            }
        });
    };
    NewsAdmin.prototype.active = function (id) {
        var self = this;
        self.busy = self.newsService.ActiveNews(new ElementRequest_1.ElementRequest(id)).then(function (response) {
            self.toastr.success("Новость " + response.txt);
        });
    };
    NewsAdmin = __decorate([
        core_1.Component({
            selector: 'news-admin',
            template: __webpack_require__(936)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            news_1.NewsAdminService,
            router_1.Router,
            http_1.Http])
    ], NewsAdmin);
    return NewsAdmin;
}());
exports.NewsAdmin = NewsAdmin;


/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var router_1 = __webpack_require__(64);
var news_1 = __webpack_require__(205);
var file_1 = __webpack_require__(391);
var public_1 = __webpack_require__(88);
var ElementRequest_1 = __webpack_require__(144);
var news_2 = __webpack_require__(392);
var common_1 = __webpack_require__(73);
var news_3 = __webpack_require__(392);
var AddNews = (function () {
    function AddNews(toastr, newsService, fileService, home, router, route) {
        this.toastr = toastr;
        this.newsService = newsService;
        this.fileService = fileService;
        this.home = home;
        this.router = router;
        this.route = route;
        this.videos = new Array();
        this.news = new news_3.GetNews(null, null, null, null, null, null, null, null, null, null);
        this.files = new Array();
        var self = this;
        route.queryParams.subscribe(function (params) {
            self.id = params["key"];
        });
        self.getNews(self.id);
        self.getCommandFilter();
    }
    AddNews.prototype.ngOnInit = function () {
    };
    AddNews.prototype.getNews = function (id) {
        var self = this;
        self.busy = self.newsService.GetNews(new ElementRequest_1.ElementRequest(id)).then(function (response) {
            self.news = response.news;
            self.videos.push(response.news.urlVideo);
        });
    };
    AddNews.prototype.fileChangedTypeText = function (e) {
        var self = this;
        var target = e.target;
        var formData = new FormData();
        formData.append("image", target.files[0], self.id);
        self.busy = self.fileService.AddImgNewsTypeText(formData).then(function (response) {
            self.news.photo[0].url = response.photo.url;
            self.toastr.success("Изображение загружено");
        });
    };
    AddNews.prototype.fileChangedTypePhoto = function (e) {
        var self = this;
        self.files = [];
        var target = e.target;
        for (var i = 0; i < target.files.length; i++) {
            self.files.push(target.files[i]);
        }
        self.loadImg(0);
    };
    AddNews.prototype.fileChangedVideo = function (e) {
        var self = this;
        var target = e.target;
        var formData = new FormData();
        formData.append("video", target.files[0], self.id);
        self.busy = self.fileService.AddVideoForNews(formData).then(function (response) {
            self.videos[0] = response.txt;
            self.toastr.success("Видео загружено");
        });
    };
    AddNews.prototype.loadImg = function (i) {
        var self = this;
        var formData = new FormData();
        formData.append("image", self.files[i], self.id);
        self.busy = self.fileService.AddImgNewsTypePhoto(formData).then(function (response) {
            self.news.photo.push(response.photo);
            if (i < self.files.length - 1)
                self.loadImg(i + 1);
            else
                self.toastr.success("Загружено");
        });
    };
    AddNews.prototype.saveNews = function () {
        var self = this;
        if (self.news.title == (null || "") || self.news.text == (null || "")) {
            self.toastr.error("Не все поля заполнены");
            return;
        }
        self.busy = self.newsService.SaveNews(new news_2.SetNews(self.news.id, self.news.title, self.news.text, self.news.top, self.news.commandOne, self.news.commandTwo)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    AddNews.prototype.back = function () {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.News], {});
    };
    AddNews.prototype.preview = function () {
        var self = this;
        document.getElementById("preview-layer").style.display = "block";
    };
    AddNews.prototype.close = function () {
        document.getElementById("preview-layer").style.display = "none";
    };
    AddNews.prototype.dellPhotoForNews = function (id, i) {
        var self = this;
        self.busy = self.fileService.DellPhoto(new ElementRequest_1.ElementRequest(id)).then(function (response) {
            self.news.photo.splice(i, 1);
            self.toastr.success("Удалено");
        });
    };
    AddNews.prototype.isPhoto = function () {
        var self = this;
        return self.news.photo.length > 0;
    };
    AddNews.prototype.getCommandFilter = function () {
        var self = this;
        self.busy = self.home.GetCommandFilter().then(function (response) {
            self.commandFilter = response.commandFilter;
        });
    };
    AddNews = __decorate([
        core_1.Component({
            selector: 'add-news',
            template: __webpack_require__(937)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            news_1.NewsAdminService,
            file_1.FileService,
            public_1.HomeService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], AddNews);
    return AddNews;
}());
exports.AddNews = AddNews;


/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var FileService = (function () {
    function FileService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    FileService.prototype.AddImgNewsTypeText = function (request) {
        var self = this;
        return self.tranport.postDataImg(self.urls.addImgNewsTypeText, request);
    };
    FileService.prototype.AddImgNewsTypePhoto = function (request) {
        var self = this;
        return self.tranport.postDataImg(self.urls.addImgNewsTypePhoto, request);
    };
    FileService.prototype.DellPhoto = function (request) {
        var self = this;
        return self.tranport.postDataImg(self.urls.dellPhoto, request);
    };
    FileService.prototype.AddVideoForNews = function (request) {
        var self = this;
        return self.tranport.postDataImg(self.urls.addVideoForNews, request);
    };
    FileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], FileService);
    return FileService;
}());
exports.FileService = FileService;


/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GetNews = (function () {
    function GetNews(id, title, text, date, type, top, urlVideo, photo, commandOne, commandTwo) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.date = date;
        this.type = type;
        this.top = top;
        this.urlVideo = urlVideo;
        this.photo = photo;
        this.commandOne = commandOne;
        this.commandTwo = commandTwo;
    }
    return GetNews;
}());
exports.GetNews = GetNews;
var GetNewsInfo = (function () {
    function GetNewsInfo(id, title, date, type, top, active) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type;
        this.top = top;
        this.active = active;
    }
    return GetNewsInfo;
}());
exports.GetNewsInfo = GetNewsInfo;
var SetNews = (function () {
    function SetNews(id, title, text, top, commandOne, commandTwo) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.top = top;
        this.commandOne = commandOne;
        this.commandTwo = commandTwo;
    }
    return SetNews;
}());
exports.SetNews = SetNews;
var UrlPhotosNews = (function () {
    function UrlPhotosNews(url) {
        this.url = url;
    }
    return UrlPhotosNews;
}());
exports.UrlPhotosNews = UrlPhotosNews;


/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var router_1 = __webpack_require__(64);
var http_1 = __webpack_require__(55);
var page_1 = __webpack_require__(38);
var turnament_1 = __webpack_require__(206);
var ElementRequest_1 = __webpack_require__(144);
var common_1 = __webpack_require__(73);
var Turnament = (function () {
    function Turnament(toastr, pageService, turnamentService, router, http) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.turnamentService = turnamentService;
        this.router = router;
        this.http = http;
        this.idTurnament = null;
        this.index = null;
        var self = this;
    }
    Turnament.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(9);
        self.getTurnamentInfo();
    };
    Turnament.prototype.getTurnamentInfo = function () {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentInfo().then(function (response) {
            self.turnaments = response.turnaments;
        });
    };
    Turnament.prototype.addTurnament = function (isType, type) {
        var self = this;
        if (!isType) {
            self.toastr.error("Не выбран тип турнира");
            return;
        }
        self.busy = self.turnamentService.AddTurnament(new ElementRequest_1.ElementRequest(type)).then(function (response) {
            self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.TuningTurnament], {
                queryParams: {
                    key: response.txt
                }
            });
        });
    };
    Turnament.prototype.selectTurnament = function (id, i) {
        var self = this;
        self.idTurnament = id;
        self.index = i;
    };
    Turnament.prototype.dellTurnament = function () {
        var self = this;
        if (self.idTurnament == null && self.index == null)
            return;
        self.busy = self.turnamentService.DellTurnament(new ElementRequest_1.ElementRequest(self.idTurnament)).then(function (response) {
            self.turnaments.splice(self.index, 1);
            self.idTurnament = null;
            self.index = null;
            self.toastr.success("Турнир удален");
        });
    };
    Turnament.prototype.editTurnament = function (id) {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.TuningTurnament], {
            queryParams: {
                key: id
            }
        });
    };
    Turnament = __decorate([
        core_1.Component({
            selector: 'turnament',
            template: __webpack_require__(938)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            turnament_1.TurnamentAdminService,
            router_1.Router,
            http_1.Http])
    ], Turnament);
    return Turnament;
}());
exports.Turnament = Turnament;


/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var router_1 = __webpack_require__(64);
var common_1 = __webpack_require__(73);
var turnament_1 = __webpack_require__(206);
var ElementRequest_1 = __webpack_require__(144);
var turnamentRequest_1 = __webpack_require__(939);
var turnament_2 = __webpack_require__(940);
var TuningTurnament = (function () {
    function TuningTurnament(toastr, router, turnamentService, route) {
        this.toastr = toastr;
        this.router = router;
        this.turnamentService = turnamentService;
        this.route = route;
        this.page = 1;
        this.cause = null;
        this.commandId = null;
        this.index = null;
        this.rowSize = new Array();
        this.colSize = new Array();
        this.tours = [];
        this.table = new Array();
        this.turnament = new turnament_2.GetTurnament(null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.myDatePickerOptions = {
            dateFormat: 'yyyy-mm-dd'
        };
        var self = this;
        route.queryParams.subscribe(function (params) {
            self.id = params["key"];
        });
        self.getTurnament(self.id);
    }
    TuningTurnament.prototype.ngOnInit = function () {
    };
    TuningTurnament.prototype.getTurnament = function (id) {
        var self = this;
        self.busy = self.turnamentService.GetTurnament(new ElementRequest_1.ElementRequest(id)).then(function (response) {
            self.turnament = response.turnament;
            self.page = self.turnament.step > 1 ? 2 : 1;
            self.getTable();
            for (var i = 1; i < self.turnament.positionCommand.length; i++)
                self.tours.push(self.turnament.gameTurnament.filter(function (x) { return x.tour == i; }));
        });
    };
    TuningTurnament.prototype.getResult = function (row, col) {
        var self = this;
        var commandOneId = self.turnament.positionCommand[row - 1].commandId;
        var commandTwoId = self.turnament.positionCommand[col - 1].commandId;
        for (var i = 0; i < self.turnament.gameTurnament.length; i++) {
            if (self.turnament.gameTurnament[i].idCommandOne == commandOneId && self.turnament.gameTurnament[i].idCommandTwo == commandTwoId)
                return self.turnament.gameTurnament[i].commandOneGoals + " -- " + self.turnament.gameTurnament[i].commandTwoGoals;
            if (self.turnament.gameTurnament[i].idCommandOne == commandTwoId && self.turnament.gameTurnament[i].idCommandTwo == commandOneId)
                return self.turnament.gameTurnament[i].commandTwoGoals + " -- " + self.turnament.gameTurnament[i].commandOneGoals;
        }
    };
    TuningTurnament.prototype.getTable = function () {
        var self = this;
        var commandSize = self.turnament.positionCommand.length;
        self.rowSize = new Array();
        self.colSize = new Array();
        self.table = new Array(commandSize + 1);
        for (var i = 0; i < commandSize + 1; i++) {
            self.rowSize.push(i);
            self.table[i] = new Array(commandSize + 3);
        }
        for (var i = 0; i < commandSize + 3; i++)
            self.colSize.push(i);
        for (var row = 0; row < self.table.length; row++) {
            for (var col = 0; col < self.table[row].length; col++) {
                if (row != 0 && col != 0 && row != col && col < commandSize + 1)
                    self.table[row][col] = self.getResult(row, col);
                if (row != 0 && col == commandSize + 1)
                    self.table[row][col] = self.turnament.positionCommand[row - 1].points;
                if (row != 0 && col == commandSize + 2)
                    self.table[row][col] = self.turnament.positionCommand[row - 1].place;
                if (row == 0 && col < commandSize + 1 && row != col)
                    self.table[row][col] = self.turnament.positionCommand[col - 1].commandName;
                if (col == 0 && row < commandSize + 1 && row != col)
                    self.table[row][col] = self.turnament.positionCommand[row - 1].commandName;
                if (row == 0 && col == commandSize + 1)
                    self.table[row][col] = "Очки";
                if (row == 0 && col == commandSize + 2)
                    self.table[row][col] = "Место";
            }
        }
    };
    TuningTurnament.prototype.back = function () {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.Turnament], {});
    };
    TuningTurnament.prototype.saveTurnament = function () {
        var self = this;
        self.busy = self.turnamentService.SaveTurnamentInfo(new turnamentRequest_1.SaveTurnamentInfoRequest(self.turnament)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    TuningTurnament.prototype.openRegistration = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 1)).then(function (response) {
            self.turnament.step = 1;
            self.toastr.success("Этап регистрации");
        });
    };
    TuningTurnament.prototype.changeStep = function (step) {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, step)).then(function (response) {
            self.turnament.step = step;
            self.toastr.success("Смена этапа");
        });
    };
    TuningTurnament.prototype.completeRegistration = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 2)).then(function (response) {
            self.turnament.step = 2;
            self.page = 2;
            self.toastr.success("Этап построения");
        });
    };
    TuningTurnament.prototype.acceptDeclare = function (turnamentId, commandId, index) {
        var self = this;
        self.busy = self.turnamentService.AcceptDeclare(new turnamentRequest_1.DeclareRequest(turnamentId, commandId)).then(function (response) {
            self.turnament.commands[index].status = true;
            self.toastr.success("Заявка принята");
        });
    };
    TuningTurnament.prototype.selectDeclare = function (commandId, index) {
        var self = this;
        self.commandId = commandId;
        self.index = index;
    };
    TuningTurnament.prototype.removeDeclare = function () {
        var self = this;
        if (self.commandId == null && self.index == null)
            return;
        if (self.cause == null || self.cause == "") {
            self.toastr.error("Укажите причину отказа");
            return;
        }
        self.busy = self.turnamentService.RemoveDeclare(new turnamentRequest_1.RemoveDeclareRequest(self.turnament.id, self.commandId, self.cause)).then(function (response) {
            self.turnament.commands.splice(self.index, 1);
            self.commandId = null;
            self.index = null;
            self.cause = null;
            self.toastr.success("Заявка отклонена");
        });
    };
    TuningTurnament.prototype.calculateTable = function () {
        var self = this;
        self.busy = self.turnamentService.CalculateTable(new ElementRequest_1.ElementRequest(self.turnament.id)).then(function (response) {
            self.toastr.success("Турнирная табляца построена");
        });
    };
    TuningTurnament = __decorate([
        core_1.Component({
            selector: 'tuning-turnament',
            template: __webpack_require__(941)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            router_1.Router,
            turnament_1.TurnamentAdminService,
            router_1.ActivatedRoute])
    ], TuningTurnament);
    return TuningTurnament;
}());
exports.TuningTurnament = TuningTurnament;


/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var EmailService = (function () {
    function EmailService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    EmailService.prototype.singCodeToEmail = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.codToEmail, request);
    };
    EmailService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var http_1 = __webpack_require__(55);
var ng2_toastr_1 = __webpack_require__(21);
__webpack_require__(351);
var TransportService = (function () {
    function TransportService(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    TransportService.prototype.postData = function (url, data) {
        var self = this;
        var options = new http_1.RequestOptions({ headers: self.headers });
        return self.http.post(url, data, options)
            .toPromise()
            .then(self.extractData)
            .catch(function (error) { return self.handleError(error, self); });
    };
    TransportService.prototype.extractData = function (response) {
        return response.json() || {};
    };
    TransportService.prototype.handleError = function (error, self) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            errMsg = body.Message || JSON.stringify(body);
            if (error.statusText == "Unauthorized")
                errMsg = "Необходимо авторизоваться. Возпользуйтесть кнопкой \"Войти\"";
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        self.toastr.error(errMsg);
        return Promise.reject(errMsg);
    };
    TransportService.prototype.postDataImg = function (url, data) {
        var self = this;
        return self.http.post(url, data)
            .toPromise()
            .then(self.extractData)
            .catch(function (error) { return self.handleError(error, self); });
    };
    TransportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_toastr_1.ToastsManager])
    ], TransportService);
    return TransportService;
}());
exports.TransportService = TransportService;


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Urls = (function () {
    function Urls() {
        this.signInUser = 'api/Authorize/SignInUser';
        this.account = 'api/Authorize/GetAccount';
        this.signOutUser = 'api/Authorize/SignOutUser';
        this.registration = 'api/Authorize/Registration';
        this.confirmTheCode = 'api/Authorize/ConfirmTheCode';
        this.replacePassvord = 'api/Authorize/ReplacePassvord';
        this.getNewsActiveTop = 'api/News/GetNewsActiveTop';
        this.getNewsActive = 'api/News/GetNewsActive';
        this.codToEmail = 'api/Email/SingCodeToEmail';
        this.getAccount = 'api/Account/GetAccountInfo';
        this.addPlayer = 'api/Account/AddPlayer';
        this.dellPlayer = 'api/Account/DellPlayer';
        this.editAccountInfo = 'api/Account/EditAccountInfo';
        this.addImageAvatar = 'api/Image/AddImageAvatar';
        this.getTurnamentsForUser = 'api/Turnament/GetTurnamentsForUser';
        this.declareTournament = 'api/Turnament/DeclareTournament';
        this.command = 'api/Public/GetCommand';
        this.commandFilter = 'api/Public/GetCommandFilter';
        this.getPhoto = 'api/Public/GetPhoto';
        this.isAuth = 'api/AuthorizeAdmin/IsAuth';
        this.signInAdmin = 'api/AuthorizeAdmin/SignIn';
        this.signOutAdmin = 'api/AuthorizeAdmin/SignOutAdmin';
        this.getNewsInfo = 'api/NewsAdmin/GetNewsInfo';
        this.getNews = 'api/NewsAdmin/GetNews';
        this.dellNews = 'api/NewsAdmin/DellNews';
        this.addNews = 'api/NewsAdmin/AddNews';
        this.saveNews = 'api/NewsAdmin/SaveNews';
        this.activeNews = 'api/NewsAdmin/ActiveNews';
        this.addTurnament = 'api/TurnamentAdmin/AddTurnament';
        this.getTurnamentInfo = 'api/TurnamentAdmin/GetTurnamentInfo';
        this.dellTurnament = 'api/TurnamentAdmin/DellTurnament';
        this.getTurnament = 'api/TurnamentAdmin/GetTurnament';
        this.saveTurnamentInfo = 'api/TurnamentAdmin/SaveTurnamentInfo';
        this.changeStep = 'api/TurnamentAdmin/ChangeStep';
        this.acceptDeclare = 'api/TurnamentAdmin/AcceptDeclare';
        this.removeDeclare = 'api/TurnamentAdmin/RemoveDeclare';
        this.calculateTable = 'api/TurnamentAdmin/CalculateTable';
        this.addImgNewsTypeText = 'api/FileAdmin/AddImgNewsTypeText';
        this.addImgNewsTypePhoto = 'api/FileAdmin/AddImgNewsTypePhoto';
        this.addVideoForNews = 'api/FileAdmin/AddVideoForNews';
        this.dellPhoto = 'api/FileAdmin/DellPhoto';
    }
    return Urls;
}());
exports.Urls = Urls;


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Common;
(function (Common) {
    var NavigationState = (function () {
        function NavigationState(route, queryParams) {
            this.route = route;
            this.queryParams = queryParams;
        }
        return NavigationState;
    }());
    Common.NavigationState = NavigationState;
    var RoutePaths = (function () {
        function RoutePaths() {
        }
        RoutePaths.Home = "";
        RoutePaths.Comand = "comand";
        RoutePaths.CurrentTournaments = "current-tournaments";
        RoutePaths.NewTournaments = "new-tournaments";
        RoutePaths.PastTournaments = "past-tournaments";
        RoutePaths.Cabinet = "cabinet";
        RoutePaths.News = "news";
        RoutePaths.Photo = "photo";
        RoutePaths.Video = "video";
        RoutePaths.Admin = "admin";
        RoutePaths.EditNews = "edit-news/:key";
        RoutePaths.Turnament = "turnament";
        RoutePaths.TuningTurnament = "tuning-turnament/:key";
        RoutePaths.PlanOpp = "plan/:key/:bt/:userId/:oppId";
        RoutePaths.Checkerboard = "checkerboard/:key/:type/:bt";
        RoutePaths.CheckerboardLead = "checkerboard/:key/:type/:bt/:leadId";
        RoutePaths.CheckerboardOpp = "checkerboard/:key/:type/:bt/:oppId";
        RoutePaths.CheckerDetail = "checkerDetail/:key/:type/:bt";
        RoutePaths.Slash = "/";
        RoutePaths.Any = '**';
        return RoutePaths;
    }());
    Common.RoutePaths = RoutePaths;
})(Common = exports.Common || (exports.Common = {}));


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var VgStates = (function () {
    function VgStates() {
    }
    VgStates.VG_ENDED = 'ended';
    VgStates.VG_PAUSED = 'paused';
    VgStates.VG_PLAYING = 'playing';
    VgStates.VG_LOADING = 'waiting';
    VgStates.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    VgStates.ctorParameters = function () { return []; };
    return VgStates;
}());
exports.VgStates = VgStates;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc3RhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctc3RhdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDOzs7O3dCQUlYLE9BQU87eUJBQ04sUUFBUTswQkFDUCxTQUFTOzBCQUNULFNBQVM7O2dCQUx4QyxpQkFBVTs7OzttQkFGWDs7QUFHYSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZ1N0YXRlcyB7XG4gICAgc3RhdGljIFZHX0VOREVEOiBzdHJpbmcgPSAnZW5kZWQnO1xuICAgIHN0YXRpYyBWR19QQVVTRUQ6IHN0cmluZyA9ICdwYXVzZWQnO1xuICAgIHN0YXRpYyBWR19QTEFZSU5HOiBzdHJpbmcgPSAncGxheWluZyc7XG4gICAgc3RhdGljIFZHX0xPQURJTkc6IHN0cmluZyA9ICd3YWl0aW5nJztcbn1cbiJdfQ==

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = __webpack_require__(5);
var core_1 = __webpack_require__(1);
var VgControlsHidden = (function () {
    function VgControlsHidden() {
        this.isHiddenSubject = new Subject_1.Subject();
        this.isHidden = this.isHiddenSubject.asObservable();
    }
    VgControlsHidden.prototype.state = function (hidden) {
        this.isHiddenSubject.next(hidden);
    };
    VgControlsHidden.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    VgControlsHidden.ctorParameters = function () { return []; };
    return VgControlsHidden;
}());
exports.VgControlsHidden = VgControlsHidden;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY29udHJvbHMtaGlkZGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctY29udHJvbHMtaGlkZGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXVDO0FBRXZDLHNDQUEyQzs7SUFRdkM7K0JBRjRDLElBQUksaUJBQU8sRUFBVztRQUc5RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDdkQ7SUFFRCxnQ0FBSyxHQUFMLFVBQU0sTUFBZTtRQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQzs7Z0JBWkosaUJBQVU7Ozs7MkJBSlg7O0FBS2EsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZnQ29udHJvbHNIaWRkZW4ge1xuICAgIGlzSGlkZGVuOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gICAgcHJpdmF0ZSBpc0hpZGRlblN1YmplY3Q6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaXNIaWRkZW4gPSB0aGlzLmlzSGlkZGVuU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBzdGF0ZShoaWRkZW46IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc0hpZGRlblN1YmplY3QubmV4dChoaWRkZW4pO1xuICAgIH1cbn1cbiJdfQ==

/***/ }),

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(174);
var app_module_1 = __webpack_require__(872);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__(41);
var router_1 = __webpack_require__(64);
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(24);
var http_1 = __webpack_require__(55);
var material_modul_1 = __webpack_require__(873);
var animations_1 = __webpack_require__(279);
var angular2_busy_1 = __webpack_require__(874);
var ng2_toastr_1 = __webpack_require__(21);
var ng2_toastr_2 = __webpack_require__(21);
var angular2_text_mask_1 = __webpack_require__(884);
var mydatepicker_1 = __webpack_require__(885);
var core_2 = __webpack_require__(904);
var controls_1 = __webpack_require__(906);
var app_routes_1 = __webpack_require__(920);
var app_1 = __webpack_require__(942);
var home_1 = __webpack_require__(373);
var comand_1 = __webpack_require__(375);
var current_tournaments_1 = __webpack_require__(376);
var new_tournaments_1 = __webpack_require__(377);
var past_tournaments_1 = __webpack_require__(380);
var cabinet_1 = __webpack_require__(381);
var news_1 = __webpack_require__(384);
var photo_1 = __webpack_require__(385);
var video_command_1 = __webpack_require__(946);
var transport_1 = __webpack_require__(45);
var public_1 = __webpack_require__(88);
var authentication_1 = __webpack_require__(204);
var news_2 = __webpack_require__(203);
var email_1 = __webpack_require__(395);
var account_1 = __webpack_require__(382);
var image_1 = __webpack_require__(383);
var turnament_1 = __webpack_require__(378);
var login_1 = __webpack_require__(386);
var news_3 = __webpack_require__(389);
var add_news_1 = __webpack_require__(390);
var turnament_2 = __webpack_require__(393);
var tuning_turnament_1 = __webpack_require__(394);
var authentication_2 = __webpack_require__(387);
var news_4 = __webpack_require__(205);
var file_1 = __webpack_require__(391);
var turnament_3 = __webpack_require__(206);
var newsType_1 = __webpack_require__(949);
var turnamentType_1 = __webpack_require__(950);
var turnamentStep_1 = __webpack_require__(951);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_1.App,
                home_1.Home,
                comand_1.Comand,
                current_tournaments_1.CurrentTournaments,
                new_tournaments_1.NewTournaments,
                past_tournaments_1.PastTournaments,
                cabinet_1.Cabinet,
                news_1.News,
                photo_1.Photo,
                video_command_1.VideoCommand,
                login_1.Login,
                news_3.NewsAdmin,
                newsType_1.NewsType,
                turnamentType_1.TurnamentType,
                turnamentStep_1.TurnamentStep,
                add_news_1.AddNews,
                turnament_2.Turnament,
                tuning_turnament_1.TuningTurnament
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                angular2_text_mask_1.TextMaskModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                angular2_busy_1.BusyModule,
                material_modul_1.MaterialModule,
                animations_1.BrowserAnimationsModule,
                core_2.VgCoreModule,
                mydatepicker_1.MyDatePickerModule,
                controls_1.VgControlsModule,
                ng2_toastr_1.ToastModule.forRoot(),
                router_1.RouterModule.forRoot(app_routes_1.AppRoutes, {
                    useHash: true
                })
            ],
            providers: [
                transport_1.TransportService,
                ng2_toastr_2.ToastsManager,
                authentication_1.AuthenticationService,
                public_1.HomeService,
                news_2.NewsService,
                email_1.EmailService,
                account_1.AccountService,
                image_1.ImageService,
                authentication_2.AuthenticationAdminService,
                news_4.NewsAdminService,
                file_1.FileService,
                turnament_3.TurnamentAdminService,
                turnament_1.TurnamentService
            ],
            bootstrap: [
                app_1.App
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var material_1 = __webpack_require__(185);
var material_2 = __webpack_require__(185);
var table_1 = __webpack_require__(191);
var accordion_1 = __webpack_require__(273);
var a11y_1 = __webpack_require__(20);
var bidi_1 = __webpack_require__(31);
var overlay_1 = __webpack_require__(56);
var platform_1 = __webpack_require__(34);
var observers_1 = __webpack_require__(133);
var portal_1 = __webpack_require__(57);
var MaterialModule = (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            exports: [
                material_1.MatAutocompleteModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatTableModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatExpansionModule,
                material_1.MatFormFieldModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_2.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSlideToggleModule,
                material_1.MatSliderModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatStepperModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                material_2.MatNativeDateModule,
                table_1.CdkTableModule,
                a11y_1.A11yModule,
                bidi_1.BidiModule,
                accordion_1.CdkAccordionModule,
                observers_1.ObserversModule,
                overlay_1.OverlayModule,
                platform_1.PlatformModule,
                portal_1.PortalModule
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;


/***/ }),

/***/ 874:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(875));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(364));
__export(__webpack_require__(199));
__export(__webpack_require__(200));
__export(__webpack_require__(877));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}
exports.isDate = isDate;
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
function isWindow(obj) {
    return obj && obj.window === obj;
}
exports.isWindow = isWindow;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isDefined(value) {
    return typeof value !== 'undefined';
}
exports.isDefined = isDefined;
function equals(o1, o2) {
    if (o1 === o2) {
        return true;
    }
    ;
    if (o1 === null || o2 === null) {
        return false;
    }
    if (o1 !== o1 && o2 !== o2) {
        return true;
    }
    var t1 = typeof o1;
    var t2 = typeof o2;
    var length;
    var key;
    var keySet;
    if (t1 === t2 && t1 === 'object') {
        if (Array.isArray(o1)) {
            if (!Array.isArray(o2)) {
                return false;
            }
            if ((length = o1.length) === o2.length) {
                for (key = 0; key < length; key++) {
                    if (!equals(o1[key], o2[key])) {
                        return false;
                    }
                }
                return true;
            }
        }
        else if (isDate(o1)) {
            if (!isDate(o2)) {
                return false;
            }
            return equals(o1.getTime(), o2.getTime());
        }
        else if (isRegExp(o1)) {
            if (!isRegExp(o2)) {
                return false;
            }
            return o1.toString() === o2.toString();
        }
        else {
            if (isWindow(o1) || isWindow(o2)
                || Array.isArray(o2) || isDate(o2) || isRegExp(o2)) {
                return false;
            }
            ;
            keySet = Object.create(null);
            for (key in o1) {
                if (key.charAt(0) === '$' || isFunction(o1[key])) {
                    continue;
                }
                ;
                if (!equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet)
                    && key.charAt(0) !== '$'
                    && isDefined(o2[key])
                    && !isFunction(o2[key])) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
exports.equals = equals;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(6);
var index_1 = __webpack_require__(878);
var busy_directive_1 = __webpack_require__(364);
var busy_service_1 = __webpack_require__(199);
var busy_backdrop_component_1 = __webpack_require__(366);
var busy_component_1 = __webpack_require__(365);
var busy_config_1 = __webpack_require__(200);
var BusyModule = (function () {
    function BusyModule() {
    }
    BusyModule.forRoot = function (config) {
        return {
            ngModule: BusyModule,
            providers: [
                { provide: busy_config_1.BusyConfig, useValue: config }
            ]
        };
    };
    BusyModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                index_1.DynamicComponentModule
            ],
            declarations: [
                busy_directive_1.BusyDirective,
                busy_component_1.BusyComponent,
                busy_backdrop_component_1.BusyBackdropComponent,
            ],
            providers: [busy_service_1.BusyService],
            exports: [busy_directive_1.BusyDirective],
            entryComponents: [
                busy_component_1.BusyComponent,
                busy_backdrop_component_1.BusyBackdropComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BusyModule);
    return BusyModule;
}());
exports.BusyModule = BusyModule;
//# sourceMappingURL=busy.module.js.map

/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DynamicComponent_1 = __webpack_require__(367);
exports.DynamicComponent = DynamicComponent_1.DynamicComponent;
exports.DynamicComponentMetadata = DynamicComponent_1.DynamicComponentMetadata;
var DynamicComponentModule_1 = __webpack_require__(883);
exports.DynamicComponentModule = DynamicComponentModule_1.DynamicComponentModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var MetadataHelper_1 = __webpack_require__(880);
exports.MetadataHelper = MetadataHelper_1.MetadataHelper;
var MetadataFactory_1 = __webpack_require__(368);
exports.PropertyAnnotationFactory = MetadataFactory_1.PropertyAnnotationFactory;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
__webpack_require__(44);
var transport_1 = __webpack_require__(45);
var urls_1 = __webpack_require__(50);
var HomeService = (function () {
    function HomeService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    HomeService.prototype.GetCommand = function () {
        var self = this;
        return this.tranport.postData(self.urls.command, null);
    };
    HomeService.prototype.GetCommandFilter = function () {
        var self = this;
        return this.tranport.postData(self.urls.commandFilter, null);
    };
    HomeService.prototype.GetPhoto = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.getPhoto, request);
    };
    HomeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], HomeService);
    return HomeService;
}());
exports.HomeService = HomeService;


/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(166);
__webpack_require__(167);
var Utils_1 = __webpack_require__(881);
var MetadataFactory_1 = __webpack_require__(368);
var MetadataHelper = (function () {
    function MetadataHelper() {
    }
    MetadataHelper.findAnnotationsMetaData = function (target, annotation) {
        return MetadataHelper.findMetadata(target, annotation, MetadataFactory_1.ANNOTATIONS_METADATA);
    };
    MetadataHelper.findPropertyMetadata = function (target, annotation) {
        return MetadataHelper.findMetadata(target, annotation, MetadataFactory_1.PROP_METADATA);
    };
    MetadataHelper.findMetadata = function (target, annotation, metadataName) {
        var annotationsSearch = target.constructor === Function;
        var metadataDefinition = Reflect.getMetadata(metadataName, annotationsSearch ? target : target.constructor);
        if (annotationsSearch) {
            return (metadataDefinition || []);
        }
        else {
            var annotationMetadataInstance_1;
            var annotationMetadataHolder_1 = {};
            if (Utils_1.Utils.isPresent(metadataDefinition)) {
                Reflect.ownKeys(metadataDefinition).forEach(function (propertyKey) {
                    var predicate = function (annotationInstance) {
                        var annotationMetadata = annotation.annotationMetadata;
                        return annotationInstance instanceof annotation // Angular2 annotations support
                            || (Utils_1.Utils.isPresent(annotationMetadata) && annotationInstance instanceof annotationMetadata);
                    };
                    if (annotationMetadataInstance_1 = metadataDefinition[propertyKey].find(predicate)) {
                        Reflect.set(annotationMetadataHolder_1, propertyKey, annotationMetadataInstance_1);
                    }
                });
            }
            return annotationMetadataHolder_1;
        }
    };
    return MetadataHelper;
}());
exports.MetadataHelper = MetadataHelper;
//# sourceMappingURL=MetadataHelper.js.map

/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Utils = (function () {
    function Utils() {
    }
    Utils.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    Utils.isUndefined = function (obj) {
        return obj === undefined;
    };
    Utils.isString = function (obj) {
        return typeof obj === 'string';
    };
    Utils.isFunction = function (obj) {
        return typeof obj === 'function';
    };
    Utils.isArray = function (obj) {
        return Array.isArray(obj);
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Utils = (function () {
    function Utils() {
    }
    Utils.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    Utils.isUndefined = function (obj) {
        return obj === undefined;
    };
    Utils.isString = function (obj) {
        return typeof obj === 'string';
    };
    Utils.isFunction = function (obj) {
        return typeof obj === 'function';
    };
    Utils.isArray = function (obj) {
        return Array.isArray(obj);
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var DynamicComponent_1 = __webpack_require__(367);
var DynamicComponentModule = (function () {
    function DynamicComponentModule() {
    }
    DynamicComponentModule = __decorate([
        core_1.NgModule({
            declarations: [
                DynamicComponent_1.DynamicComponent
            ],
            exports: [
                DynamicComponent_1.DynamicComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DynamicComponentModule);
    return DynamicComponentModule;
}());
exports.DynamicComponentModule = DynamicComponentModule;
//# sourceMappingURL=DynamicComponentModule.js.map

/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(24);
var textMaskCore_1 = __webpack_require__(369);
exports.MASKEDINPUT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MaskedInputDirective; }),
    multi: true
};
var MaskedInputDirective = (function () {
    function MaskedInputDirective(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.textMaskConfig = {
            mask: [],
            guide: true,
            placeholderChar: '_',
            pipe: undefined,
            keepCharPositions: false,
        };
        this._onTouched = function () { };
        this._onChange = function (_) { };
    }
    MaskedInputDirective.prototype.ngOnChanges = function (changes) {
        this.setupMask();
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(this.inputElement.value);
        }
    };
    MaskedInputDirective.prototype.writeValue = function (value) {
        if (!this.inputElement) {
            this.setupMask();
        }
        // set the initial value for cases where the mask is disabled
        var normalizedValue = value == null ? '' : value;
        this.renderer.setElementProperty(this.inputElement, 'value', normalizedValue);
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
        }
    };
    MaskedInputDirective.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    MaskedInputDirective.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    MaskedInputDirective.prototype.setDisabledState = function (isDisabled) {
        this.renderer.setElementProperty(this.element.nativeElement, 'disabled', isDisabled);
    };
    MaskedInputDirective.prototype.onInput = function (value) {
        if (!this.inputElement) {
            this.setupMask();
        }
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
            // get the updated value
            value = this.inputElement.value;
            // check against the last value to prevent firing ngModelChange despite no changes
            if (this.lastValue !== value) {
                this.lastValue = value;
                this._onChange(value);
            }
        }
    };
    MaskedInputDirective.prototype.setupMask = function () {
        if (this.element.nativeElement.tagName === 'INPUT') {
            // `textMask` directive is used directly on an input element
            this.inputElement = this.element.nativeElement;
        }
        else {
            // `textMask` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
            this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0];
        }
        if (this.inputElement) {
            this.textMaskInputElement = textMaskCore_1.createTextMaskInputElement(Object.assign({ inputElement: this.inputElement }, this.textMaskConfig));
        }
    };
    return MaskedInputDirective;
}());
__decorate([
    core_1.Input('textMask'),
    __metadata("design:type", Object)
], MaskedInputDirective.prototype, "textMaskConfig", void 0);
MaskedInputDirective = __decorate([
    core_1.Directive({
        host: {
            '(input)': 'onInput($event.target.value)',
            '(blur)': '_onTouched()'
        },
        selector: '[textMask]',
        providers: [exports.MASKEDINPUT_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], MaskedInputDirective);
exports.MaskedInputDirective = MaskedInputDirective;
var TextMaskModule = (function () {
    function TextMaskModule() {
    }
    return TextMaskModule;
}());
TextMaskModule = __decorate([
    core_1.NgModule({
        declarations: [MaskedInputDirective],
        exports: [MaskedInputDirective]
    })
], TextMaskModule);
exports.TextMaskModule = TextMaskModule;
var textMaskCore_2 = __webpack_require__(369);
exports.conformToMask = textMaskCore_2.conformToMask;
//# sourceMappingURL=angular2TextMask.js.map

/***/ }),

/***/ 885:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_my_date_picker_module__ = __webpack_require__(886);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MyDatePickerModule", function() { return __WEBPACK_IMPORTED_MODULE_0__dist_my_date_picker_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_my_date_picker_component__ = __webpack_require__(370);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MYDP_VALUE_ACCESSOR", function() { return __WEBPACK_IMPORTED_MODULE_1__dist_my_date_picker_component__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MyDatePicker", function() { return __WEBPACK_IMPORTED_MODULE_1__dist_my_date_picker_component__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_interfaces_my_date_interface__ = __webpack_require__(890);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_interfaces_my_date_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dist_interfaces_my_date_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_2__dist_interfaces_my_date_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_2__dist_interfaces_my_date_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_interfaces_my_date_model_interface__ = __webpack_require__(891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dist_interfaces_my_date_model_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dist_interfaces_my_date_model_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_3__dist_interfaces_my_date_model_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_3__dist_interfaces_my_date_model_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dist_interfaces_my_input_field_changed_interface__ = __webpack_require__(892);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dist_interfaces_my_input_field_changed_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__dist_interfaces_my_input_field_changed_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_4__dist_interfaces_my_input_field_changed_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_4__dist_interfaces_my_input_field_changed_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dist_interfaces_my_calendar_view_changed_interface__ = __webpack_require__(893);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dist_interfaces_my_calendar_view_changed_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__dist_interfaces_my_calendar_view_changed_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_5__dist_interfaces_my_calendar_view_changed_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_5__dist_interfaces_my_calendar_view_changed_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dist_interfaces_my_input_focus_blur_interface__ = __webpack_require__(894);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dist_interfaces_my_input_focus_blur_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__dist_interfaces_my_input_focus_blur_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_6__dist_interfaces_my_input_focus_blur_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_6__dist_interfaces_my_input_focus_blur_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dist_interfaces_my_date_range_interface__ = __webpack_require__(895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dist_interfaces_my_date_range_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__dist_interfaces_my_date_range_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_7__dist_interfaces_my_date_range_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_7__dist_interfaces_my_date_range_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dist_interfaces_my_day_labels_interface__ = __webpack_require__(896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dist_interfaces_my_day_labels_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__dist_interfaces_my_day_labels_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_8__dist_interfaces_my_day_labels_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_8__dist_interfaces_my_day_labels_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dist_interfaces_my_month_labels_interface__ = __webpack_require__(897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dist_interfaces_my_month_labels_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__dist_interfaces_my_month_labels_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_9__dist_interfaces_my_month_labels_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_9__dist_interfaces_my_month_labels_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dist_interfaces_my_options_interface__ = __webpack_require__(898);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dist_interfaces_my_options_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__dist_interfaces_my_options_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_10__dist_interfaces_my_options_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_10__dist_interfaces_my_options_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__dist_interfaces_my_weekday_interface__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__dist_interfaces_my_weekday_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__dist_interfaces_my_weekday_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_11__dist_interfaces_my_weekday_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_11__dist_interfaces_my_weekday_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dist_interfaces_my_marked_date_interface__ = __webpack_require__(900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dist_interfaces_my_marked_date_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__dist_interfaces_my_marked_date_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_12__dist_interfaces_my_marked_date_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_12__dist_interfaces_my_marked_date_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__dist_interfaces_my_marked_dates_interface__ = __webpack_require__(901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__dist_interfaces_my_marked_dates_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__dist_interfaces_my_marked_dates_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_13__dist_interfaces_my_marked_dates_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_13__dist_interfaces_my_marked_dates_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dist_interfaces_my_default_month_interface__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dist_interfaces_my_default_month_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__dist_interfaces_my_default_month_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_14__dist_interfaces_my_default_month_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_14__dist_interfaces_my_default_month_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dist_interfaces_my_selector_interface__ = __webpack_require__(903);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dist_interfaces_my_selector_interface___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__dist_interfaces_my_selector_interface__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_15__dist_interfaces_my_selector_interface__) if(["MyDatePickerModule","MYDP_VALUE_ACCESSOR","MyDatePicker","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_15__dist_interfaces_my_selector_interface__[key]; }) }(__WEBPACK_IMPORT_KEY__));

















/***/ }),

/***/ 886:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyDatePickerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_date_picker_component__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_my_date_picker_focus_directive__ = __webpack_require__(889);





var MyDatePickerModule = (function () {
    function MyDatePickerModule() {
    }
    MyDatePickerModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"], args: [{
                    imports: [__WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]],
                    declarations: [__WEBPACK_IMPORTED_MODULE_3__my_date_picker_component__["b" /* MyDatePicker */], __WEBPACK_IMPORTED_MODULE_4__directives_my_date_picker_focus_directive__["a" /* FocusDirective */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_3__my_date_picker_component__["b" /* MyDatePicker */], __WEBPACK_IMPORTED_MODULE_4__directives_my_date_picker_focus_directive__["a" /* FocusDirective */]]
                },] },
    ];
    MyDatePickerModule.ctorParameters = [];
    return MyDatePickerModule;
}());
//# sourceMappingURL=my-date-picker.module.js.map

/***/ }),

/***/ 887:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocaleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);

var LocaleService = (function () {
    function LocaleService() {
        this.locales = {
            "en": {
                dayLabels: { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
                dateFormat: "mm/dd/yyyy",
                todayBtnTxt: "Today",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "he": {
                dayLabels: { su: "רא", mo: "שנ", tu: "של", we: "רב", th: "חמ", fr: "שי", sa: "שב" },
                monthLabels: { 1: "ינו", 2: "פבר", 3: "מרץ", 4: "אפר", 5: "מאי", 6: "יונ", 7: "יול", 8: "אוג", 9: "ספט", 10: "אוק", 11: "נוב", 12: "דצמ" },
                dateFormat: "dd/mm/yyyy",
                todayBtnTxt: "היום",
                firstDayOfWeek: "su",
                sunHighlight: false
            },
            "ja": {
                dayLabels: { su: "日", mo: "月", tu: "火", we: "水", th: "木", fr: "金", sa: "土" },
                monthLabels: { 1: "１月", 2: "２月", 3: "３月", 4: "４月", 5: "５月", 6: "６月", 7: "７月", 8: "８月", 9: "９月", 10: "１０月", 11: "１１月", 12: "１２月" },
                dateFormat: "yyyy.mm.dd",
                todayBtnTxt: "今日",
                sunHighlight: false
            },
            "fr": {
                dayLabels: { su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam" },
                monthLabels: { 1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc" },
                dateFormat: "dd/mm/yyyy",
                todayBtnTxt: "Aujourd'hui",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "fr-ch": {
                dayLabels: { su: "Dim", mo: "Lun", tu: "Mar", we: "Mer", th: "Jeu", fr: "Ven", sa: "Sam" },
                monthLabels: { 1: "Jan", 2: "Fév", 3: "Mar", 4: "Avr", 5: "Mai", 6: "Juin", 7: "Juil", 8: "Aoû", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Déc" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Aujourd'hui",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "fi": {
                dayLabels: { su: "Su", mo: "Ma", tu: "Ti", we: "Ke", th: "To", fr: "Pe", sa: "La" },
                monthLabels: { 1: "Tam", 2: "Hel", 3: "Maa", 4: "Huh", 5: "Tou", 6: "Kes", 7: "Hei", 8: "Elo", 9: "Syy", 10: "Lok", 11: "Mar", 12: "Jou" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Tänään",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "es": {
                dayLabels: { su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa" },
                monthLabels: { 1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Hoy",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "hu": {
                dayLabels: { su: "Vas", mo: "Hét", tu: "Kedd", we: "Sze", th: "Csü", fr: "Pén", sa: "Szo" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Már", 4: "Ápr", 5: "Máj", 6: "Jún", 7: "Júl", 8: "Aug", 9: "Szep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "yyyy-mm-dd",
                todayBtnTxt: "Ma",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "sv": {
                dayLabels: { su: "Sön", mo: "Mån", tu: "Tis", we: "Ons", th: "Tor", fr: "Fre", sa: "Lör" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Maj", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "yyyy-mm-dd",
                todayBtnTxt: "Idag",
                firstDayOfWeek: "mo",
                sunHighlight: false
            },
            "nl": {
                dayLabels: { su: "Zon", mo: "Maa", tu: "Din", we: "Woe", th: "Don", fr: "Vri", sa: "Zat" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mei", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd-mm-yyyy",
                todayBtnTxt: "Vandaag",
                firstDayOfWeek: "mo",
                sunHighlight: false
            },
            "ru": {
                dayLabels: { su: "Вс", mo: "Пн", tu: "Вт", we: "Ср", th: "Чт", fr: "Пт", sa: "Сб" },
                monthLabels: { 1: "Янв", 2: "Фев", 3: "Март", 4: "Апр", 5: "Май", 6: "Июнь", 7: "Июль", 8: "Авг", 9: "Сент", 10: "Окт", 11: "Ноя", 12: "Дек" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Сегодня",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "uk": {
                dayLabels: { su: "Нд", mo: "Пн", tu: "Вт", we: "Ср", th: "Чт", fr: "Пт", sa: "Сб" },
                monthLabels: { 1: "Січ", 2: "Лют", 3: "Бер", 4: "Кві", 5: "Тра", 6: "Чер", 7: "Лип", 8: "Сер", 9: "Вер", 10: "Жов", 11: "Лис", 12: "Гру" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Сьогодні",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "no": {
                dayLabels: { su: "Søn", mo: "Man", tu: "Tir", we: "Ons", th: "Tor", fr: "Fre", sa: "Lør" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Des" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "I dag",
                firstDayOfWeek: "mo",
                sunHighlight: false
            },
            "tr": {
                dayLabels: { su: "Paz", mo: "Pzt", tu: "Sal", we: "Çar", th: "Per", fr: "Cum", sa: "Cmt" },
                monthLabels: { 1: "Oca", 2: "Şub", 3: "Mar", 4: "Nis", 5: "May", 6: "Haz", 7: "Tem", 8: "Ağu", 9: "Eyl", 10: "Eki", 11: "Kas", 12: "Ara" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Bugün",
                firstDayOfWeek: "mo",
                sunHighlight: false
            },
            "pt-br": {
                dayLabels: { su: "Dom", mo: "Seg", tu: "Ter", we: "Qua", th: "Qui", fr: "Sex", sa: "Sab" },
                monthLabels: { 1: "Jan", 2: "Fev", 3: "Mar", 4: "Abr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Set", 10: "Out", 11: "Nov", 12: "Dez" },
                dateFormat: "dd/mm/yyyy",
                todayBtnTxt: "Hoje",
                firstDayOfWeek: "su",
                sunHighlight: true
            },
            "de": {
                dayLabels: { su: "So", mo: "Mo", tu: "Di", we: "Mi", th: "Do", fr: "Fr", sa: "Sa" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mär", 4: "Apr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dez" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Heute",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "de-ch": {
                dayLabels: { su: "So", mo: "Mo", tu: "Di", we: "Mi", th: "Do", fr: "Fr", sa: "Sa" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mär", 4: "Apr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dez" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Heute",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "it": {
                dayLabels: { su: "Dom", mo: "Lun", tu: "Mar", we: "Mer", th: "Gio", fr: "Ven", sa: "Sab" },
                monthLabels: { 1: "Gen", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mag", 6: "Giu", 7: "Lug", 8: "Ago", 9: "Set", 10: "Ott", 11: "Nov", 12: "Dic" },
                dateFormat: "dd/mm/yyyy",
                todayBtnTxt: "Oggi",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "it-ch": {
                dayLabels: { su: "Dom", mo: "Lun", tu: "Mar", we: "Mer", th: "Gio", fr: "Ven", sa: "Sab" },
                monthLabels: { 1: "Gen", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mag", 6: "Giu", 7: "Lug", 8: "Ago", 9: "Set", 10: "Ott", 11: "Nov", 12: "Dic" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Oggi",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "pl": {
                dayLabels: { su: "Nie", mo: "Pon", tu: "Wto", we: "Śro", th: "Czw", fr: "Pią", sa: "Sob" },
                monthLabels: { 1: "Sty", 2: "Lut", 3: "Mar", 4: "Kwi", 5: "Maj", 6: "Cze", 7: "Lip", 8: "Sie", 9: "Wrz", 10: "Paź", 11: "Lis", 12: "Gru" },
                dateFormat: "yyyy-mm-dd",
                todayBtnTxt: "Dzisiaj",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "my": {
                dayLabels: { su: "တနင်္ဂနွေ", mo: "တနင်္လာ", tu: "အင်္ဂါ", we: "ဗုဒ္ဓဟူး", th: "ကြသပတေး", fr: "သောကြာ", sa: "စနေ" },
                monthLabels: { 1: "ဇန်နဝါရီ", 2: "ဖေဖော်ဝါရီ", 3: "မတ်", 4: "ဧပြီ", 5: "မေ", 6: "ဇွန်", 7: "ဇူလိုင်", 8: "ဩဂုတ်", 9: "စက်တင်ဘာ", 10: "အောက်တိုဘာ", 11: "နိုဝင်ဘာ", 12: "ဒီဇင်ဘာ" },
                dateFormat: "yyyy-mm-dd",
                todayBtnTxt: "ယနေ့",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "sk": {
                dayLabels: { su: "Ne", mo: "Po", tu: "Ut", we: "St", th: "Št", fr: "Pi", sa: "So" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Máj", 6: "Jún", 7: "Júl", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Dnes",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "sl": {
                dayLabels: { su: "Ned", mo: "Pon", tu: "Tor", we: "Sre", th: "Čet", fr: "Pet", sa: "Sob" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Maj", 6: "Jun", 7: "Jul", 8: "Avg", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd. mm. yyyy",
                todayBtnTxt: "Danes",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "zh-cn": {
                dayLabels: { su: "日", mo: "一", tu: "二", we: "三", th: "四", fr: "五", sa: "六" },
                monthLabels: { 1: "1月", 2: "2月", 3: "3月", 4: "4月", 5: "5月", 6: "6月", 7: "7月", 8: "8月", 9: "9月", 10: "10月", 11: "11月", 12: "12月" },
                dateFormat: "yyyy-mm-dd",
                todayBtnTxt: "今天",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "ro": {
                dayLabels: { su: "du", mo: "lu", tu: "ma", we: "mi", th: "jo", fr: "vi", sa: "sa" },
                monthLabels: { 1: "ian", 2: "feb", 3: "mart", 4: "apr", 5: "mai", 6: "iun", 7: "iul", 8: "aug", 9: "sept", 10: "oct", 11: "nov", 12: "dec" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Astăzi",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "ca": {
                dayLabels: { su: "dg", mo: "dl", tu: "dt", we: "dc", th: "dj", fr: "dv", sa: "ds" },
                monthLabels: { 1: "Gen", 2: "Febr", 3: "Març", 4: "Abr", 5: "Maig", 6: "Juny", 7: "Jul", 8: "Ag", 9: "Set", 10: "Oct", 11: "Nov", 12: "Des" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Avui",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "id": {
                dayLabels: { su: "Min", mo: "Sen", tu: "Sel", we: "Rab", th: "Kam", fr: "Jum", sa: "Sab" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Mei", 6: "Jun", 7: "Jul", 8: "Ags", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Des" },
                dateFormat: "dd-mm-yyyy",
                todayBtnTxt: "Hari ini",
                firstDayOfWeek: "su",
                sunHighlight: true
            },
            "en-au": {
                dayLabels: { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
                dateFormat: "dd/mm/yyyy",
                todayBtnTxt: "Today",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "am-et": {
                dayLabels: { su: "እሑድ", mo: "ሰኞ", tu: "ማክሰኞ", we: "ረቡዕ", th: "ሐሙስ", fr: "ዓርብ", sa: "ቅዳሜ" },
                monthLabels: { 1: "ጃንዩ", 2: "ፌብሩ", 3: "ማርች", 4: "ኤፕረ", 5: "ሜይ", 6: "ጁን", 7: "ጁላይ", 8: "ኦገስ", 9: "ሴፕቴ", 10: "ኦክተ", 11: "ኖቬም", 12: "ዲሴም" },
                dateFormat: "yyyy-mm-dd",
                todayBtnTxt: "ዛሬ",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "cs": {
                dayLabels: { su: "Ne", mo: "Po", tu: "Út", we: "St", th: "Čt", fr: "Pá", sa: "So" },
                monthLabels: { 1: "Led", 2: "Úno", 3: "Bře", 4: "Dub", 5: "Kvě", 6: "Čvn", 7: "Čvc", 8: "Srp", 9: "Zář", 10: "Říj", 11: "Lis", 12: "Pro" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Dnes",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "el": {
                dayLabels: { su: "Κυρ", mo: "Δευ", tu: "Τρι", we: "Τετ", th: "Πεμ", fr: "Παρ", sa: "Σαβ" },
                monthLabels: { 1: "Ιαν", 2: "Φεβ", 3: "Μαρ", 4: "Απρ", 5: "Μαι", 6: "Ιουν", 7: "Ιουλ", 8: "Αυγ", 9: "Σεπ", 10: "Οκτ", 11: "Νοε", 12: "Δεκ" },
                dateFormat: "dd/mm/yyyy",
                todayBtnTxt: "Σήμερα",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "kk": {
                dayLabels: { su: "Жк", mo: "Дс", tu: "Сс", we: "Ср", th: "Бс", fr: "Жм", sa: "Сб" },
                monthLabels: { 1: "Қаң", 2: "Ақп", 3: "Нау", 4: "Сәу", 5: "Мам", 6: "Мау", 7: "Шіл", 8: "Там", 9: "Қырк", 10: "Қаз", 11: "Қар", 12: "Желт" },
                dateFormat: "dd-mmm-yyyy",
                todayBtnTxt: "Бүгін",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "th": {
                dayLabels: { su: "อา", mo: "จ", tu: "อ", we: "พ", th: "พฤ", fr: "ศ", sa: "ส" },
                monthLabels: { 1: "ม.ค", 2: "ก.พ.", 3: "มี.ค.", 4: "เม.ย.", 5: "พ.ค.", 6: "มิ.ย.", 7: "ก.ค.", 8: "ส.ค.", 9: "ก.ย.", 10: "ต.ค.", 11: "พ.ย.", 12: "ธ.ค." },
                dateFormat: "dd-mm-yyyy",
                todayBtnTxt: "วันนี้",
                firstDayOfWeek: "su",
                sunHighlight: true
            },
            "ko-kr": {
                dayLabels: { su: "일", mo: "월", tu: "화", we: "수", th: "목", fr: "금", sa: "토" },
                monthLabels: { 1: "1월", 2: "2월", 3: "3월", 4: "4월", 5: "5월", 6: "6월", 7: "7월", 8: "8월", 9: "9월", 10: "10월", 11: "11월", 12: "12월" },
                dateFormat: "yyyy mm dd",
                todayBtnTxt: "오늘",
                firstDayOfWeek: "su",
                sunHighlight: true
            },
            "da": {
                dayLabels: { su: "Søn", mo: "Man", tu: "Tir", we: "Ons", th: "Tor", fr: "Fre", sa: "Lør" },
                monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "Maj", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
                dateFormat: "dd-mm-yyyy",
                todayBtnTxt: "I dag",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "lt": {
                dayLabels: { su: "Sk", mo: "Pr", tu: "An", we: "Tr", th: "Kt", fr: "Pn", sa: "Št" },
                monthLabels: { 1: "Saus.", 2: "Vas.", 3: "Kov.", 4: "Bal.", 5: "Geg.", 6: "Birž.", 7: "Liep.", 8: "Rugp.", 9: "Rugs.", 10: "Sapl.", 11: "Lapkr.", 12: "Gruod." },
                dateFormat: "yyyy-mm-dd",
                todayBtnTxt: "Šianien",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "vi": {
                dayLabels: { su: "CN", mo: "T2", tu: "T3", we: "T4", th: "T5", fr: "T6", sa: "T7" },
                monthLabels: { 1: "THG 1", 2: "THG 2", 3: "THG 3", 4: "THG 4", 5: "THG 5", 6: "THG 6", 7: "THG 7", 8: "THG 8", 9: "THG 9", 10: "THG 10", 11: "THG 11", 12: "THG 12" },
                dateFormat: "dd/mm/yyyy",
                todayBtnTxt: "Hôm nay",
                firstDayOfWeek: "mo",
                sunHighlight: true,
            },
            "bn": {
                dayLabels: { su: "রবি", mo: "সোম", tu: "মঙ্গল", we: "বুধ", th: "বৃহঃ", fr: "শুক্র", sa: "শনি" },
                monthLabels: { 1: "জানু", 2: "ফেব্রু", 3: "মার্চ", 4: "এপ্রিল", 5: "মে", 6: "জুন", 7: "জুলাই", 8: "আগস্ট", 9: "সেপ্টে", 10: "অক্টো", 11: "নভে", 12: "ডিসে" },
                dateFormat: "dd-mm-yyyy",
                todayBtnTxt: "আজ",
                firstDayOfWeek: "su",
                sunHighlight: true
            },
            "bg": {
                dayLabels: { su: "нд", mo: "пн", tu: "вт", we: "ср", th: "чт", fr: "пт", sa: "сб" },
                monthLabels: { 1: "яну.", 2: "фев.", 3: "март", 4: "апр.", 5: "май", 6: "юни", 7: "юли", 8: "авг.", 9: "сеп.", 10: "окт.", 11: "ное.", 12: "дек." },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "днес",
                firstDayOfWeek: "mo",
                sunHighlight: true
            },
            "hr": {
                dayLabels: { su: "Ne", mo: "Po", tu: "Ul", we: "Sr", th: "Če", fr: "Pe", sa: "Su" },
                monthLabels: { 1: "Sij", 2: "Vel", 3: "Ožu", 4: "Tra", 5: "Svi", 6: "Lip", 7: "Srp", 8: "Kol", 9: "Ruj", 10: "Lis", 11: "Stu", 12: "Pro" },
                dateFormat: "dd.mm.yyyy.",
                todayBtnTxt: "danas",
                firstDayOfWeek: "su",
                sunHighlight: true
            },
            "ar": {
                dayLabels: { su: "الأحد", mo: "الاثنين", tu: "الثلاثاء", we: "الاربعاء", th: "الخميس", fr: "الجمعة", sa: "السبت" },
                monthLabels: { 1: "يناير", 2: "فبراير", 3: "مارس", 4: "ابريل", 5: "مايو", 6: "يونيو", 7: "يوليو", 8: "أغسطس", 9: "سبتمبر", 10: "أكتوبر", 11: "نوفمبر", 12: "ديسمبر" },
                dateFormat: "yyyy-mm-dd",
                todayBtnTxt: "اليوم",
                firstDayOfWeek: "sa",
                sunHighlight: true
            },
            "is": {
                dayLabels: { su: "sun", mo: "mán", tu: "þri", we: "mið", th: "fim", fr: "fös", sa: "lau" },
                monthLabels: { 1: "jan", 2: "feb", 3: "mar", 4: "apr", 5: "maí", 6: "jún", 7: "júl", 8: "ágú", 9: "sep", 10: "okt", 11: "nóv", 12: "des" },
                dateFormat: "dd.mm.yyyy",
                todayBtnTxt: "Í dag",
                firstDayOfWeek: "su",
                sunHighlight: true
            }
        };
    }
    LocaleService.prototype.getLocaleOptions = function (locale) {
        if (locale && this.locales.hasOwnProperty(locale)) {
            return this.locales[locale];
        }
        return this.locales["ru"];
    };
    LocaleService.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    LocaleService.ctorParameters = [];
    return LocaleService;
}());
//# sourceMappingURL=my-date-picker.locale.service.js.map

/***/ }),

/***/ 888:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);

var M = "m";
var MM = "mm";
var MMM = "mmm";
var D = "d";
var DD = "dd";
var YYYY = "yyyy";
var UtilService = (function () {
    function UtilService() {
        this.weekDays = ["su", "mo", "tu", "we", "th", "fr", "sa"];
    }
    UtilService.prototype.isDateValid = function (dateStr, dateFormat, minYear, maxYear, disableUntil, disableSince, disableWeekends, disableWeekDays, disableDays, disableDateRanges, monthLabels, enableDays) {
        var returnDate = { day: 0, month: 0, year: 0 };
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var isMonthStr = dateFormat.indexOf(MMM) !== -1;
        var delimeters = this.getDateFormatDelimeters(dateFormat);
        var dateValue = this.getDateValue(dateStr, dateFormat, delimeters);
        var year = this.getNumberByValue(dateValue[0]);
        var month = isMonthStr ? this.getMonthNumberByMonthName(dateValue[1], monthLabels) : this.getNumberByValue(dateValue[1]);
        var day = this.getNumberByValue(dateValue[2]);
        if (month !== -1 && day !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }
            var date = { year: year, month: month, day: day };
            if (this.isDisabledDay(date, minYear, maxYear, disableUntil, disableSince, disableWeekends, disableWeekDays, disableDays, disableDateRanges, enableDays)) {
                return returnDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }
            if (day < 1 || day > daysInMonth[month - 1]) {
                return returnDate;
            }
            return date;
        }
        return returnDate;
    };
    UtilService.prototype.getDateValue = function (dateStr, dateFormat, delimeters) {
        var del = delimeters[0];
        if (delimeters[0] !== delimeters[1]) {
            del = delimeters[0] + delimeters[1];
        }
        var re = new RegExp("[" + del + "]");
        var ds = dateStr.split(re);
        var df = dateFormat.split(re);
        var da = [];
        for (var i = 0; i < df.length; i++) {
            if (df[i].indexOf(YYYY) !== -1) {
                da[0] = { value: ds[i], format: df[i] };
            }
            if (df[i].indexOf(M) !== -1) {
                da[1] = { value: ds[i], format: df[i] };
            }
            if (df[i].indexOf(D) !== -1) {
                da[2] = { value: ds[i], format: df[i] };
            }
        }
        return da;
    };
    UtilService.prototype.getMonthNumberByMonthName = function (df, monthLabels) {
        if (df.value) {
            for (var key = 1; key <= 12; key++) {
                if (df.value.toLowerCase() === monthLabels[key].toLowerCase()) {
                    return key;
                }
            }
        }
        return -1;
    };
    UtilService.prototype.getNumberByValue = function (df) {
        if (!/^\d+$/.test(df.value)) {
            return -1;
        }
        var nbr = Number(df.value);
        if (df.format.length === 1 && df.value.length !== 1 && nbr < 10 || df.format.length === 1 && df.value.length !== 2 && nbr >= 10) {
            nbr = -1;
        }
        else if (df.format.length === 2 && df.value.length > 2) {
            nbr = -1;
        }
        return nbr;
    };
    UtilService.prototype.getDateFormatDelimeters = function (dateFormat) {
        return dateFormat.match(/[^(dmy)]{1,}/g);
    };
    UtilService.prototype.parseDefaultMonth = function (monthString) {
        var month = { monthTxt: "", monthNbr: 0, year: 0 };
        if (monthString !== "") {
            var split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0]) : parseInt(split[1]);
            month.year = split[0].length === 2 ? parseInt(split[1]) : parseInt(split[0]);
        }
        return month;
    };
    UtilService.prototype.formatDate = function (date, dateFormat, monthLabels) {
        var formatted = dateFormat.replace(YYYY, String(date.year));
        if (dateFormat.indexOf(MMM) !== -1) {
            formatted = formatted.replace(MMM, monthLabels[date.month]);
        }
        else if (dateFormat.indexOf(MM) !== -1) {
            formatted = formatted.replace(MM, this.preZero(date.month));
        }
        else {
            formatted = formatted.replace(M, String(date.month));
        }
        if (dateFormat.indexOf(DD) !== -1) {
            formatted = formatted.replace(DD, this.preZero(date.day));
        }
        else {
            formatted = formatted.replace(D, String(date.day));
        }
        return formatted;
    };
    UtilService.prototype.preZero = function (val) {
        return val < 10 ? "0" + val : String(val);
    };
    UtilService.prototype.isDisabledDay = function (date, minYear, maxYear, disableUntil, disableSince, disableWeekends, disableWeekDays, disableDays, disableDateRanges, enableDays) {
        for (var _i = 0, enableDays_1 = enableDays; _i < enableDays_1.length; _i++) {
            var e = enableDays_1[_i];
            if (e.year === date.year && e.month === date.month && e.day === date.day) {
                return false;
            }
        }
        var dn = this.getDayNumber(date);
        if (date.year < minYear && date.month === 12 || date.year > maxYear && date.month === 1) {
            return true;
        }
        var dateMs = this.getTimeInMilliseconds(date);
        if (this.isInitializedDate(disableUntil) && dateMs <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }
        if (this.isInitializedDate(disableSince) && dateMs >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }
        if (disableWeekends) {
            if (dn === 0 || dn === 6) {
                return true;
            }
        }
        if (disableWeekDays.length > 0) {
            for (var _a = 0, disableWeekDays_1 = disableWeekDays; _a < disableWeekDays_1.length; _a++) {
                var wd = disableWeekDays_1[_a];
                if (dn === this.getWeekdayIndex(wd)) {
                    return true;
                }
            }
        }
        for (var _b = 0, disableDays_1 = disableDays; _b < disableDays_1.length; _b++) {
            var d = disableDays_1[_b];
            if (d.year === date.year && d.month === date.month && d.day === date.day) {
                return true;
            }
        }
        for (var _c = 0, disableDateRanges_1 = disableDateRanges; _c < disableDateRanges_1.length; _c++) {
            var d = disableDateRanges_1[_c];
            if (this.isInitializedDate(d.begin) && this.isInitializedDate(d.end) && dateMs >= this.getTimeInMilliseconds(d.begin) && dateMs <= this.getTimeInMilliseconds(d.end)) {
                return true;
            }
        }
        return false;
    };
    UtilService.prototype.isMarkedDate = function (date, markedDates, markWeekends) {
        for (var _i = 0, markedDates_1 = markedDates; _i < markedDates_1.length; _i++) {
            var md = markedDates_1[_i];
            for (var _a = 0, _b = md.dates; _a < _b.length; _a++) {
                var d = _b[_a];
                if (d.year === date.year && d.month === date.month && d.day === date.day) {
                    return { marked: true, color: md.color };
                }
            }
        }
        if (markWeekends && markWeekends.marked) {
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return { marked: true, color: markWeekends.color };
            }
        }
        return { marked: false, color: "" };
    };
    UtilService.prototype.isHighlightedDate = function (date, sunHighlight, satHighlight, highlightDates) {
        var dayNbr = this.getDayNumber(date);
        if (sunHighlight && dayNbr === 0 || satHighlight && dayNbr === 6) {
            return true;
        }
        for (var _i = 0, highlightDates_1 = highlightDates; _i < highlightDates_1.length; _i++) {
            var d = highlightDates_1[_i];
            if (d.year === date.year && d.month === date.month && d.day === date.day) {
                return true;
            }
        }
        return false;
    };
    UtilService.prototype.getWeekNumber = function (date) {
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    };
    UtilService.prototype.isMonthDisabledByDisableUntil = function (date, disableUntil) {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    };
    UtilService.prototype.isMonthDisabledByDisableSince = function (date, disableSince) {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    };
    UtilService.prototype.isInitializedDate = function (date) {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    };
    UtilService.prototype.isSameDate = function (d1, d2) {
        return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
    };
    UtilService.prototype.getTimeInMilliseconds = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    };
    UtilService.prototype.getDayNumber = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getDay();
    };
    UtilService.prototype.getWeekDays = function () {
        return this.weekDays;
    };
    UtilService.prototype.getWeekdayIndex = function (wd) {
        return this.weekDays.indexOf(wd);
    };
    UtilService.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    UtilService.ctorParameters = [];
    return UtilService;
}());
//# sourceMappingURL=my-date-picker.util.service.js.map

/***/ }),

/***/ 889:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FocusDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);

var FocusDirective = (function () {
    function FocusDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    FocusDirective.prototype.ngAfterViewInit = function () {
        if (this.value === "0") {
            return;
        }
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus", []);
    };
    FocusDirective.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                    selector: "[mydpfocus]"
                },] },
    ];
    FocusDirective.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
    ];
    FocusDirective.propDecorators = {
        'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ["mydpfocus",] },],
    };
    return FocusDirective;
}());
//# sourceMappingURL=my-date-picker.focus.directive.js.map

/***/ }),

/***/ 890:
/***/ (function(module, exports) {

//# sourceMappingURL=my-date.interface.js.map

/***/ }),

/***/ 891:
/***/ (function(module, exports) {

//# sourceMappingURL=my-date-model.interface.js.map

/***/ }),

/***/ 892:
/***/ (function(module, exports) {

//# sourceMappingURL=my-input-field-changed.interface.js.map

/***/ }),

/***/ 893:
/***/ (function(module, exports) {

//# sourceMappingURL=my-calendar-view-changed.interface.js.map

/***/ }),

/***/ 894:
/***/ (function(module, exports) {

//# sourceMappingURL=my-input-focus-blur.interface.js.map

/***/ }),

/***/ 895:
/***/ (function(module, exports) {

//# sourceMappingURL=my-date-range.interface.js.map

/***/ }),

/***/ 896:
/***/ (function(module, exports) {

//# sourceMappingURL=my-day-labels.interface.js.map

/***/ }),

/***/ 897:
/***/ (function(module, exports) {

//# sourceMappingURL=my-month-labels.interface.js.map

/***/ }),

/***/ 898:
/***/ (function(module, exports) {

//# sourceMappingURL=my-options.interface.js.map

/***/ }),

/***/ 899:
/***/ (function(module, exports) {

//# sourceMappingURL=my-weekday.interface.js.map

/***/ }),

/***/ 900:
/***/ (function(module, exports) {

//# sourceMappingURL=my-marked-date.interface.js.map

/***/ }),

/***/ 901:
/***/ (function(module, exports) {

//# sourceMappingURL=my-marked-dates.interface.js.map

/***/ }),

/***/ 902:
/***/ (function(module, exports) {

//# sourceMappingURL=my-default-month.interface.js.map

/***/ }),

/***/ 903:
/***/ (function(module, exports) {

//# sourceMappingURL=my-selector.interface.js.map

/***/ }),

/***/ 904:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(905));
// CustomEvent polyfill for IE9/10/11
(function () {
    if (typeof window === "undefined" || typeof window['CustomEvent'] === "function")
        return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window['Event'].prototype;
    window['CustomEvent'] = CustomEvent;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBZ0M7O0FBR2hDLENBQUM7SUFFRyxFQUFFLENBQUMsQ0FBRSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBTyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssVUFBVyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUVqRyxxQkFBdUIsS0FBSyxFQUFFLE1BQU07UUFDaEMsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDNUUsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBRSxhQUFhLENBQUUsQ0FBQztRQUNoRCxHQUFHLENBQUMsZUFBZSxDQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBQy9FLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDZDtJQUVELFdBQVcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUVsRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsV0FBVyxDQUFDO0NBQ3ZDLENBQUMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSAnLi9zcmMvY29yZS9jb3JlJztcblxuLy8gQ3VzdG9tRXZlbnQgcG9seWZpbGwgZm9yIElFOS8xMC8xMVxuKGZ1bmN0aW9uICgpIHtcblxuICAgIGlmICggdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2Ygd2luZG93WydDdXN0b21FdmVudCddID09PSBcImZ1bmN0aW9uXCIgKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBDdXN0b21FdmVudCAoIGV2ZW50LCBwYXJhbXMgKSB7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWQgfTtcbiAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCAnQ3VzdG9tRXZlbnQnICk7XG4gICAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoIGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwgKTtcbiAgICAgICAgcmV0dXJuIGV2dDtcbiAgICB9XG5cbiAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3dbJ0V2ZW50J10ucHJvdG90eXBlO1xuXG4gICAgd2luZG93WydDdXN0b21FdmVudCddID0gQ3VzdG9tRXZlbnQ7XG59KSgpO1xuIl19

/***/ }),

/***/ 905:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_player_1 = __webpack_require__(371);
var vg_media_1 = __webpack_require__(201);
var vg_cue_points_1 = __webpack_require__(372);
var vg_api_1 = __webpack_require__(28);
var vg_fullscreen_api_1 = __webpack_require__(142);
var vg_utils_1 = __webpack_require__(143);
var vg_controls_hidden_1 = __webpack_require__(87);
// components
__export(__webpack_require__(371));
__export(__webpack_require__(201));
__export(__webpack_require__(372));
// services
__export(__webpack_require__(28));
__export(__webpack_require__(142));
__export(__webpack_require__(143));
__export(__webpack_require__(87));
// types
__export(__webpack_require__(202));
__export(__webpack_require__(86));
/**
 * @internal
 */
function coreDirectives() {
    return [
        vg_player_1.VgPlayer, vg_media_1.VgMedia, vg_cue_points_1.VgCuePoints
    ];
}
exports.coreDirectives = coreDirectives;
function coreServices() {
    return [
        vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_utils_1.VgUtils, vg_controls_hidden_1.VgControlsHidden
    ];
}
exports.coreServices = coreServices;
var VgCoreModule = (function () {
    function VgCoreModule() {
    }
    VgCoreModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: coreDirectives(),
                    exports: coreDirectives(),
                    providers: coreServices()
                },] },
    ];
    /** @nocollapse */
    VgCoreModule.ctorParameters = function () { return []; };
    return VgCoreModule;
}());
exports.VgCoreModule = VgCoreModule;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQ0FBbUQ7QUFDbkQsbURBQWlEO0FBQ2pELGdEQUE4QztBQUM5QywrREFBNEQ7QUFDNUQsNENBQTBDO0FBQzFDLGtFQUErRDtBQUMvRCxnREFBOEM7QUFDOUMsb0VBQWlFO0FBR2pFLGFBQWE7QUFDYiwyQ0FBc0M7QUFDdEMseUNBQW9DO0FBQ3BDLG1EQUE4QztBQUU5QyxXQUFXO0FBQ1gsdUNBQWtDO0FBQ2xDLGtEQUE2QztBQUM3Qyx5Q0FBb0M7QUFDcEMsbURBQThDO0FBRTlDLFFBQVE7QUFDUix3Q0FBbUM7QUFDbkMsd0NBQW1DOzs7O0FBS25DO0lBQ0ksTUFBTSxDQUFDO1FBQ0gsb0JBQVEsRUFBRSxrQkFBTyxFQUFFLDJCQUFXO0tBQ2pDLENBQUM7Q0FDTDtBQUpELHdDQUlDO0FBRUQ7SUFDSSxNQUFNLENBQUM7UUFDSCxjQUFLLEVBQUUsbUNBQWUsRUFBRSxrQkFBTyxFQUFFLHFDQUFnQjtLQUNwRCxDQUFDO0NBQ0w7QUFKRCxvQ0FJQzs7Ozs7Z0JBRUEsZUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRSxjQUFjLEVBQUU7b0JBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUU7b0JBQ3pCLFNBQVMsRUFBRSxZQUFZLEVBQUU7aUJBQzVCOzs7O3VCQTVDRDs7QUE2Q2Esb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnUGxheWVyIH0gZnJvbSAnLi92Zy1wbGF5ZXIvdmctcGxheWVyJztcbmltcG9ydCB7IFZnTWVkaWEgfSBmcm9tICcuL3ZnLW1lZGlhL3ZnLW1lZGlhJztcbmltcG9ydCB7IFZnQ3VlUG9pbnRzIH0gZnJvbSAnLi92Zy1jdWUtcG9pbnRzL3ZnLWN1ZS1wb2ludHMnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ0Z1bGxzY3JlZW5BUEkgfSBmcm9tICcuL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpJztcbmltcG9ydCB7IFZnVXRpbHMgfSBmcm9tICcuL3NlcnZpY2VzL3ZnLXV0aWxzJztcbmltcG9ydCB7IFZnQ29udHJvbHNIaWRkZW4gfSBmcm9tICcuL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5cblxuLy8gY29tcG9uZW50c1xuZXhwb3J0ICogZnJvbSAnLi92Zy1wbGF5ZXIvdmctcGxheWVyJztcbmV4cG9ydCAqIGZyb20gJy4vdmctbWVkaWEvdmctbWVkaWEnO1xuZXhwb3J0ICogZnJvbSAnLi92Zy1jdWUtcG9pbnRzL3ZnLWN1ZS1wb2ludHMnO1xuXG4vLyBzZXJ2aWNlc1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy92Zy1hcGknO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaSc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL3ZnLXV0aWxzJztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvdmctY29udHJvbHMtaGlkZGVuJztcblxuLy8gdHlwZXNcbmV4cG9ydCAqIGZyb20gJy4vZXZlbnRzL3ZnLWV2ZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3N0YXRlcy92Zy1zdGF0ZXMnO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29yZURpcmVjdGl2ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgVmdQbGF5ZXIsIFZnTWVkaWEsIFZnQ3VlUG9pbnRzXG4gICAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcmVTZXJ2aWNlcygpOiBQcm92aWRlcltdIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBWZ0FQSSwgVmdGdWxsc2NyZWVuQVBJLCBWZ1V0aWxzLCBWZ0NvbnRyb2xzSGlkZGVuXG4gICAgXTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IGNvcmVEaXJlY3RpdmVzKCksXG4gICAgZXhwb3J0czogY29yZURpcmVjdGl2ZXMoKSxcbiAgICBwcm92aWRlcnM6IGNvcmVTZXJ2aWNlcygpXG59KVxuZXhwb3J0IGNsYXNzIFZnQ29yZU1vZHVsZSB7XG59XG4iXX0=

/***/ }),

/***/ 906:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(907));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vc3JjL2NvbnRyb2xzL2NvbnRyb2xzJztcbiJdfQ==

/***/ }),

/***/ 907:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(6);
var vg_controls_1 = __webpack_require__(908);
var vg_fullscreen_1 = __webpack_require__(909);
var vg_mute_1 = __webpack_require__(910);
var vg_volume_1 = __webpack_require__(911);
var vg_play_pause_1 = __webpack_require__(912);
var vg_playback_button_1 = __webpack_require__(913);
var vg_scrub_bar_1 = __webpack_require__(914);
var vg_scrub_bar_buffering_time_1 = __webpack_require__(915);
var vg_scrub_bar_cue_points_1 = __webpack_require__(916);
var vg_scrub_bar_current_time_1 = __webpack_require__(917);
var vg_time_display_1 = __webpack_require__(918);
var vg_track_selector_1 = __webpack_require__(919);
var vg_controls_hidden_1 = __webpack_require__(87);
var VgControlsModule = (function () {
    function VgControlsModule() {
    }
    VgControlsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [
                        vg_controls_1.VgControls,
                        vg_fullscreen_1.VgFullscreen,
                        vg_mute_1.VgMute,
                        vg_volume_1.VgVolume,
                        vg_play_pause_1.VgPlayPause,
                        vg_playback_button_1.VgPlaybackButton,
                        vg_scrub_bar_1.VgScrubBar,
                        vg_scrub_bar_buffering_time_1.VgScrubBarBufferingTime,
                        vg_scrub_bar_cue_points_1.VgScrubBarCuePoints,
                        vg_scrub_bar_current_time_1.VgScrubBarCurrentTime,
                        vg_time_display_1.VgTimeDisplay,
                        vg_time_display_1.VgUtcPipe,
                        vg_track_selector_1.VgTrackSelector
                    ],
                    exports: [
                        vg_controls_1.VgControls,
                        vg_fullscreen_1.VgFullscreen,
                        vg_mute_1.VgMute,
                        vg_volume_1.VgVolume,
                        vg_play_pause_1.VgPlayPause,
                        vg_playback_button_1.VgPlaybackButton,
                        vg_scrub_bar_1.VgScrubBar,
                        vg_scrub_bar_buffering_time_1.VgScrubBarBufferingTime,
                        vg_scrub_bar_cue_points_1.VgScrubBarCuePoints,
                        vg_scrub_bar_current_time_1.VgScrubBarCurrentTime,
                        vg_time_display_1.VgTimeDisplay,
                        vg_time_display_1.VgUtcPipe,
                        vg_track_selector_1.VgTrackSelector
                    ],
                    providers: [vg_controls_hidden_1.VgControlsHidden]
                },] },
    ];
    /** @nocollapse */
    VgControlsModule.ctorParameters = function () { return []; };
    return VgControlsModule;
}());
exports.VgControlsModule = VgControlsModule;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QywwQ0FBK0M7QUFDL0MsNkNBQTJDO0FBQzNDLCtEQUE2RDtBQUM3RCw2Q0FBMkM7QUFDM0MsbURBQWlEO0FBQ2pELCtEQUE0RDtBQUM1RCw4RUFBMkU7QUFDM0UsNERBQXlEO0FBQ3pELHNIQUFpSDtBQUNqSCwwR0FBcUc7QUFDckcsZ0hBQTJHO0FBQzNHLHFFQUE2RTtBQUM3RSwyRUFBd0U7QUFDeEUsNEVBQXlFOzs7OztnQkFFeEUsZUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFFLHFCQUFZLENBQUU7b0JBQ3pCLFlBQVksRUFBRTt3QkFDVix3QkFBVTt3QkFDViw0QkFBWTt3QkFDWixnQkFBTTt3QkFDTixvQkFBUTt3QkFDUiwyQkFBVzt3QkFDWCxxQ0FBZ0I7d0JBQ2hCLHlCQUFVO3dCQUNWLHFEQUF1Qjt3QkFDdkIsNkNBQW1CO3dCQUNuQixpREFBcUI7d0JBQ3JCLCtCQUFhO3dCQUNiLDJCQUFTO3dCQUNULG1DQUFlO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsd0JBQVU7d0JBQ1YsNEJBQVk7d0JBQ1osZ0JBQU07d0JBQ04sb0JBQVE7d0JBQ1IsMkJBQVc7d0JBQ1gscUNBQWdCO3dCQUNoQix5QkFBVTt3QkFDVixxREFBdUI7d0JBQ3ZCLDZDQUFtQjt3QkFDbkIsaURBQXFCO3dCQUNyQiwrQkFBYTt3QkFDYiwyQkFBUzt3QkFDVCxtQ0FBZTtxQkFDbEI7b0JBQ0QsU0FBUyxFQUFFLENBQUUscUNBQWdCLENBQUU7aUJBQ2xDOzs7OzJCQWpERDs7QUFrRGEsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzIH0gZnJvbSAnLi92Zy1jb250cm9scyc7XG5pbXBvcnQgeyBWZ0Z1bGxzY3JlZW4gfSBmcm9tICcuL3ZnLWZ1bGxzY3JlZW4vdmctZnVsbHNjcmVlbic7XG5pbXBvcnQgeyBWZ011dGUgfSBmcm9tICcuL3ZnLW11dGUvdmctbXV0ZSc7XG5pbXBvcnQgeyBWZ1ZvbHVtZSB9IGZyb20gJy4vdmctdm9sdW1lL3ZnLXZvbHVtZSc7XG5pbXBvcnQgeyBWZ1BsYXlQYXVzZSB9IGZyb20gJy4vdmctcGxheS1wYXVzZS92Zy1wbGF5LXBhdXNlJztcbmltcG9ydCB7IFZnUGxheWJhY2tCdXR0b24gfSBmcm9tICcuL3ZnLXBsYXliYWNrLWJ1dHRvbi92Zy1wbGF5YmFjay1idXR0b24nO1xuaW1wb3J0IHsgVmdTY3J1YkJhciB9IGZyb20gJy4vdmctc2NydWItYmFyL3ZnLXNjcnViLWJhcic7XG5pbXBvcnQgeyBWZ1NjcnViQmFyQnVmZmVyaW5nVGltZSB9IGZyb20gJy4vdmctc2NydWItYmFyL3ZnLXNjcnViLWJhci1idWZmZXJpbmctdGltZS92Zy1zY3J1Yi1iYXItYnVmZmVyaW5nLXRpbWUnO1xuaW1wb3J0IHsgVmdTY3J1YkJhckN1ZVBvaW50cyB9IGZyb20gJy4vdmctc2NydWItYmFyL3ZnLXNjcnViLWJhci1jdWUtcG9pbnRzL3ZnLXNjcnViLWJhci1jdWUtcG9pbnRzJztcbmltcG9ydCB7IFZnU2NydWJCYXJDdXJyZW50VGltZSB9IGZyb20gJy4vdmctc2NydWItYmFyL3ZnLXNjcnViLWJhci1jdXJyZW50LXRpbWUvdmctc2NydWItYmFyLWN1cnJlbnQtdGltZSc7XG5pbXBvcnQgeyBWZ1RpbWVEaXNwbGF5LCBWZ1V0Y1BpcGUgfSBmcm9tICcuL3ZnLXRpbWUtZGlzcGxheS92Zy10aW1lLWRpc3BsYXknO1xuaW1wb3J0IHsgVmdUcmFja1NlbGVjdG9yIH0gZnJvbSAnLi92Zy10cmFjay1zZWxlY3Rvci92Zy10cmFjay1zZWxlY3Rvcic7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzSGlkZGVuIH0gZnJvbSAnLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVmdDb250cm9scyxcbiAgICAgICAgVmdGdWxsc2NyZWVuLFxuICAgICAgICBWZ011dGUsXG4gICAgICAgIFZnVm9sdW1lLFxuICAgICAgICBWZ1BsYXlQYXVzZSxcbiAgICAgICAgVmdQbGF5YmFja0J1dHRvbixcbiAgICAgICAgVmdTY3J1YkJhcixcbiAgICAgICAgVmdTY3J1YkJhckJ1ZmZlcmluZ1RpbWUsXG4gICAgICAgIFZnU2NydWJCYXJDdWVQb2ludHMsXG4gICAgICAgIFZnU2NydWJCYXJDdXJyZW50VGltZSxcbiAgICAgICAgVmdUaW1lRGlzcGxheSxcbiAgICAgICAgVmdVdGNQaXBlLFxuICAgICAgICBWZ1RyYWNrU2VsZWN0b3JcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVmdDb250cm9scyxcbiAgICAgICAgVmdGdWxsc2NyZWVuLFxuICAgICAgICBWZ011dGUsXG4gICAgICAgIFZnVm9sdW1lLFxuICAgICAgICBWZ1BsYXlQYXVzZSxcbiAgICAgICAgVmdQbGF5YmFja0J1dHRvbixcbiAgICAgICAgVmdTY3J1YkJhcixcbiAgICAgICAgVmdTY3J1YkJhckJ1ZmZlcmluZ1RpbWUsXG4gICAgICAgIFZnU2NydWJCYXJDdWVQb2ludHMsXG4gICAgICAgIFZnU2NydWJCYXJDdXJyZW50VGltZSxcbiAgICAgICAgVmdUaW1lRGlzcGxheSxcbiAgICAgICAgVmdVdGNQaXBlLFxuICAgICAgICBWZ1RyYWNrU2VsZWN0b3JcbiAgICBdLFxuICAgIHByb3ZpZGVyczogWyBWZ0NvbnRyb2xzSGlkZGVuIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdDb250cm9sc01vZHVsZSB7XG59XG4iXX0=

/***/ }),

/***/ 908:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var Observable_1 = __webpack_require__(0);
var vg_api_1 = __webpack_require__(28);
var vg_controls_hidden_1 = __webpack_require__(87);
__webpack_require__(136);
var vg_states_1 = __webpack_require__(86);
var VgControls = (function () {
    function VgControls(API, ref, hidden) {
        this.API = API;
        this.ref = ref;
        this.hidden = hidden;
        this.isAdsPlaying = 'initial';
        this.hideControls = false;
        this.vgAutohide = false;
        this.vgAutohideTime = 3;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    VgControls.prototype.ngOnInit = function () {
        var _this = this;
        var mouseMove = Observable_1.Observable.fromEvent(this.API.videogularElement, 'mousemove');
        this.subscriptions.push(mouseMove.subscribe(this.show.bind(this)));
        var touchStart = Observable_1.Observable.fromEvent(this.API.videogularElement, 'touchstart');
        this.subscriptions.push(touchStart.subscribe(this.show.bind(this)));
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgControls.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        this.subscriptions.push(this.target.subscriptions.play.subscribe(this.onPlay.bind(this)));
        this.subscriptions.push(this.target.subscriptions.pause.subscribe(this.onPause.bind(this)));
        this.subscriptions.push(this.target.subscriptions.startAds.subscribe(this.onStartAds.bind(this)));
        this.subscriptions.push(this.target.subscriptions.endAds.subscribe(this.onEndAds.bind(this)));
    };
    VgControls.prototype.ngAfterViewInit = function () {
        if (this.vgAutohide) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    VgControls.prototype.onPlay = function () {
        if (this.vgAutohide) {
            this.hide();
        }
    };
    VgControls.prototype.onPause = function () {
        clearTimeout(this.timer);
        this.hideControls = false;
        this.hidden.state(false);
    };
    VgControls.prototype.onStartAds = function () {
        this.isAdsPlaying = 'none';
    };
    VgControls.prototype.onEndAds = function () {
        this.isAdsPlaying = 'initial';
    };
    VgControls.prototype.hide = function () {
        if (this.vgAutohide) {
            clearTimeout(this.timer);
            this.hideAsync();
        }
    };
    VgControls.prototype.show = function () {
        clearTimeout(this.timer);
        this.hideControls = false;
        this.hidden.state(false);
        if (this.vgAutohide) {
            this.hideAsync();
        }
    };
    VgControls.prototype.hideAsync = function () {
        var _this = this;
        if (this.API.state === vg_states_1.VgStates.VG_PLAYING) {
            this.timer = setTimeout(function () {
                _this.hideControls = true;
                _this.hidden.state(true);
            }, this.vgAutohideTime * 1000);
        }
    };
    VgControls.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgControls.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-controls',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "<ng-content></ng-content>",
                    styles: ["\n        vg-controls {\n            position: absolute;\n            display: flex;\n            width: 100%;\n            height: 50px;\n            z-index: 300;\n            bottom: 0;\n            background-color: rgba(0, 0, 0, 0.5);\n            -webkit-transition: bottom 1s;\n            -khtml-transition: bottom 1s;\n            -moz-transition: bottom 1s;\n            -ms-transition: bottom 1s;\n            transition: bottom 1s;\n        }\n\n        vg-controls.hide {  \n            bottom: -50px;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgControls.ctorParameters = function () { return [
        { type: vg_api_1.VgAPI, },
        { type: core_1.ElementRef, },
        { type: vg_controls_hidden_1.VgControlsHidden, },
    ]; };
    VgControls.propDecorators = {
        "isAdsPlaying": [{ type: core_1.HostBinding, args: ['style.pointer-events',] },],
        "hideControls": [{ type: core_1.HostBinding, args: ['class.hide',] },],
        "vgFor": [{ type: core_1.Input },],
        "vgAutohide": [{ type: core_1.Input },],
        "vgAutohideTime": [{ type: core_1.Input },],
    };
    return VgControls;
}());
exports.VgControls = VgControls;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1jb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUd1QjtBQUN2Qiw4Q0FBNkM7QUFDN0Msa0RBQWdEO0FBQ2hELDRFQUF5RTtBQUN6RSx5Q0FBdUM7QUFDdkMsc0RBQW9EOztJQTRDaEQsb0JBQW9CLEdBQVUsRUFBVSxHQUFlLEVBQVUsTUFBd0I7UUFBckUsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjs0QkFaN0IsU0FBUzs0QkFDbEIsS0FBSzswQkFHekIsS0FBSzs4QkFDRixDQUFDOzZCQUtILEVBQUU7UUFHOUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0tBQ2pDO0lBRUQsNkJBQVEsR0FBUjtRQUFBLGlCQWFDO1FBWkcsSUFBSSxTQUFTLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRSxJQUFJLFVBQVUsR0FBRyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZ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O1FBQUEsaUJBT0M7UUFORyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQixFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDbEM7S0FDSjtJQUVELGdDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztLQUNwRDs7Z0JBOUhKLGdCQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxNQUFNLEVBQUUsQ0FBRSxxaEJBbUJULENBQUM7aUJBQ0w7Ozs7Z0JBOUJRLGNBQUs7Z0JBSmdCLGlCQUFVO2dCQUsvQixxQ0FBZ0I7OztpQ0FrQ3BCLGtCQUFXLFNBQUMsc0JBQXNCO2lDQUNsQyxrQkFBVyxTQUFDLFlBQVk7MEJBRXhCLFlBQUs7K0JBQ0wsWUFBSzttQ0FDTCxZQUFLOztxQkE3Q1Y7O0FBb0NhLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBBZnRlclZpZXdJbml0LCBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBFdmVudEVtaXR0ZXIsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzSGlkZGVuIH0gZnJvbSAnLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IFZnU3RhdGVzIH0gZnJvbSAnLi4vY29yZS9zdGF0ZXMvdmctc3RhdGVzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1jb250cm9scycsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlczogWyBgXG4gICAgICAgIHZnLWNvbnRyb2xzIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHotaW5kZXg6IDMwMDtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYm90dG9tIDFzO1xuICAgICAgICAgICAgLWtodG1sLXRyYW5zaXRpb246IGJvdHRvbSAxcztcbiAgICAgICAgICAgIC1tb3otdHJhbnNpdGlvbjogYm90dG9tIDFzO1xuICAgICAgICAgICAgLW1zLXRyYW5zaXRpb246IGJvdHRvbSAxcztcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGJvdHRvbSAxcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLWNvbnRyb2xzLmhpZGUgeyAgXG4gICAgICAgICAgICBib3R0b206IC01MHB4O1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmdDb250cm9scyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBvaW50ZXItZXZlbnRzJykgaXNBZHNQbGF5aW5nOiBzdHJpbmcgPSAnaW5pdGlhbCc7XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oaWRlJykgaGlkZUNvbnRyb2xzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB2Z0Zvcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHZnQXV0b2hpZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB2Z0F1dG9oaWRlVGltZTogbnVtYmVyID0gMztcblxuICAgIHByaXZhdGUgdGltZXI6IGFueTtcbiAgICBwcml2YXRlIGhpZGVUaW1lcjogYW55O1xuXG4gICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgQVBJOiBWZ0FQSSwgcHJpdmF0ZSByZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgaGlkZGVuOiBWZ0NvbnRyb2xzSGlkZGVuKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgbW91c2VNb3ZlID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQodGhpcy5BUEkudmlkZW9ndWxhckVsZW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobW91c2VNb3ZlLnN1YnNjcmliZSh0aGlzLnNob3cuYmluZCh0aGlzKSkpO1xuXG4gICAgICAgIGxldCB0b3VjaFN0YXJ0ID0gT2JzZXJ2YWJsZS5mcm9tRXZlbnQodGhpcy5BUEkudmlkZW9ndWxhckVsZW1lbnQsICd0b3VjaHN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRvdWNoU3RhcnQuc3Vic2NyaWJlKHRoaXMuc2hvdy5iaW5kKHRoaXMpKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuQVBJLmlzUGxheWVyUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMudGFyZ2V0LnN1YnNjcmlwdGlvbnMucGxheS5zdWJzY3JpYmUodGhpcy5vblBsYXkuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRhcmdldC5zdWJzY3JpcHRpb25zLnBhdXNlLnN1YnNjcmliZSh0aGlzLm9uUGF1c2UuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRhcmdldC5zdWJzY3JpcHRpb25zLnN0YXJ0QWRzLnN1YnNjcmliZSh0aGlzLm9uU3RhcnRBZHMuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRhcmdldC5zdWJzY3JpcHRpb25zLmVuZEFkcy5zdWJzY3JpYmUodGhpcy5vbkVuZEFkcy5iaW5kKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy52Z0F1dG9oaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5KCkge1xuICAgICAgICBpZiAodGhpcy52Z0F1dG9oaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGF1c2UoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgdGhpcy5oaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRkZW4uc3RhdGUoZmFsc2UpO1xuICAgIH1cblxuICAgIG9uU3RhcnRBZHMoKSB7XG4gICAgICAgIHRoaXMuaXNBZHNQbGF5aW5nID0gJ25vbmUnO1xuICAgIH1cblxuICAgIG9uRW5kQWRzKCkge1xuICAgICAgICB0aGlzLmlzQWRzUGxheWluZyA9ICdpbml0aWFsJztcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAodGhpcy52Z0F1dG9oaWRlKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgICAgICB0aGlzLmhpZGVBc3luYygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB0aGlzLmhpZGVDb250cm9scyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGRlbi5zdGF0ZShmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudmdBdXRvaGlkZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlQXN5bmMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUFzeW5jKCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuc3RhdGUgPT09IFZnU3RhdGVzLlZHX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVDb250cm9scyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW4uc3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB9LCB0aGlzLnZnQXV0b2hpZGVUaW1lICogMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbn1cbiJdfQ==

/***/ }),

/***/ 909:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var vg_fullscreen_api_1 = __webpack_require__(142);
var VgFullscreen = (function () {
    function VgFullscreen(ref, API, fsAPI) {
        this.API = API;
        this.fsAPI = fsAPI;
        this.isFullscreen = false;
        this.subscriptions = [];
        this.ariaValue = 'normal mode';
        this.elem = ref.nativeElement;
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
    }
    VgFullscreen.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgFullscreen.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgFullscreen.prototype.onChangeFullscreen = function (fsState) {
        this.ariaValue = fsState ? 'fullscren mode' : 'normal mode';
        this.isFullscreen = fsState;
    };
    VgFullscreen.prototype.onClick = function () {
        this.changeFullscreenState();
    };
    VgFullscreen.prototype.onKeyDown = function (event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.changeFullscreenState();
        }
    };
    VgFullscreen.prototype.changeFullscreenState = function () {
        var element = this.target;
        if (this.target instanceof vg_api_1.VgAPI) {
            element = null;
        }
        this.fsAPI.toggleFullscreen(element);
    };
    VgFullscreen.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgFullscreen.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-fullscreen',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <div class=\"icon\"\n             [class.vg-icon-fullscreen]=\"!isFullscreen\"\n             [class.vg-icon-fullscreen_exit]=\"isFullscreen\"\n             tabindex=\"0\"\n             role=\"button\"\n             aria-label=\"fullscreen button\"\n             [attr.aria-valuetext]=\"ariaValue\">\n        </div>",
                    styles: ["\n        vg-fullscreen {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n\n        vg-fullscreen .icon {\n            pointer-events: none;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgFullscreen.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
        { type: vg_fullscreen_api_1.VgFullscreenAPI, },
    ]; };
    VgFullscreen.propDecorators = {
        "onClick": [{ type: core_1.HostListener, args: ['click',] },],
        "onKeyDown": [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return VgFullscreen;
}());
exports.VgFullscreen = VgFullscreen;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZnVsbHNjcmVlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLWZ1bGxzY3JlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEc7QUFDMUcscURBQW1EO0FBQ25ELDJFQUF3RTs7SUFnRHBFLHNCQUFZLEdBQWUsRUFBUyxHQUFVLEVBQVMsS0FBc0I7UUFBekMsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUFTLFVBQUssR0FBTCxLQUFLLENBQWlCOzRCQU5yRCxLQUFLOzZCQUVHLEVBQUU7eUJBRXRCLGFBQWE7UUFHckIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hHO0lBRUQsK0JBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7U0FDNUY7S0FDSjtJQUVELG9DQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuRDtJQUVELHlDQUFrQixHQUFsQixVQUFtQixPQUFnQjtRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sR0FBRyxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7UUFDNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7S0FDL0I7SUFHRCw4QkFBTztRQUNILElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztJQUlqQyxnQ0FBUyxhQUFDLEtBQW9COztRQUUxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQ2hDOztJQUdMLDRDQUFxQixHQUFyQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sWUFBWSxjQUFLLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0tBQ3BEOztnQkE3RkosZ0JBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxzVUFRQztvQkFDWCxNQUFNLEVBQUUsQ0FBRSw2aUJBb0JULENBQUU7aUJBQ047Ozs7Z0JBdkNtQixpQkFBVTtnQkFDckIsY0FBSztnQkFDTCxtQ0FBZTs7OzRCQXVFbkIsbUJBQVksU0FBQyxPQUFPOzhCQUtwQixtQkFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7dUJBOUV2Qzs7QUF3Q2Esb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IFZnRnVsbHNjcmVlbkFQSSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdmctZnVsbHNjcmVlbi1hcGknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmctZnVsbHNjcmVlbicsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiXG4gICAgICAgICAgICAgW2NsYXNzLnZnLWljb24tZnVsbHNjcmVlbl09XCIhaXNGdWxsc2NyZWVuXCJcbiAgICAgICAgICAgICBbY2xhc3MudmctaWNvbi1mdWxsc2NyZWVuX2V4aXRdPVwiaXNGdWxsc2NyZWVuXCJcbiAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJmdWxsc2NyZWVuIGJ1dHRvblwiXG4gICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZXRleHRdPVwiYXJpYVZhbHVlXCI+XG4gICAgICAgIDwvZGl2PmAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctZnVsbHNjcmVlbiB7XG4gICAgICAgICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLWZ1bGxzY3JlZW4gLmljb24ge1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cbiAgICBgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdGdWxsc2NyZWVuIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIHZnRm9yOiBzdHJpbmc7XG4gICAgdGFyZ2V0OiBPYmplY3Q7XG4gICAgaXNGdWxsc2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgYXJpYVZhbHVlID0gJ25vcm1hbCBtb2RlJztcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgcHVibGljIEFQSTogVmdBUEksIHB1YmxpYyBmc0FQSTogVmdGdWxsc2NyZWVuQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLmZzQVBJLm9uQ2hhbmdlRnVsbHNjcmVlbi5zdWJzY3JpYmUodGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4uYmluZCh0aGlzKSkpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VGdWxsc2NyZWVuKGZzU3RhdGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5hcmlhVmFsdWUgPSBmc1N0YXRlID8gJ2Z1bGxzY3JlbiBtb2RlJyA6ICdub3JtYWwgbW9kZSc7XG4gICAgICAgIHRoaXMuaXNGdWxsc2NyZWVuID0gZnNTdGF0ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGdWxsc2NyZWVuU3RhdGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gT24gcHJlc3MgRW50ZXIgKDEzKSBvciBTcGFjZSAoMzIpXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5rZXlDb2RlID09PSAzMikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRnVsbHNjcmVlblN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VGdWxsc2NyZWVuU3RhdGUoKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy50YXJnZXQ7XG5cbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0IGluc3RhbmNlb2YgVmdBUEkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mc0FQSS50b2dnbGVGdWxsc2NyZWVuKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19

/***/ }),

/***/ 910:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var VgMute = (function () {
    function VgMute(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.ariaValue = 'unmuted';
        this.elem = ref.nativeElement;
    }
    VgMute.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgMute.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        this.currentVolume = this.target.volume;
    };
    VgMute.prototype.onClick = function () {
        this.changeMuteState();
    };
    VgMute.prototype.onKeyDown = function (event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.changeMuteState();
        }
    };
    VgMute.prototype.changeMuteState = function () {
        var volume = this.getVolume();
        if (volume === 0) {
            this.target.volume = this.currentVolume;
        }
        else {
            this.currentVolume = volume;
            this.target.volume = 0;
        }
    };
    VgMute.prototype.getVolume = function () {
        var volume = this.target ? this.target.volume : 0;
        this.ariaValue = volume ? 'unmuted' : 'muted';
        return volume;
    };
    VgMute.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgMute.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-mute',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <div class=\"icon\"\n             [class.vg-icon-volume_up]=\"getVolume() >= 0.75\"\n             [class.vg-icon-volume_down]=\"getVolume() >= 0.25 && getVolume() < 0.75\"\n             [class.vg-icon-volume_mute]=\"getVolume() > 0 && getVolume() < 0.25\"\n             [class.vg-icon-volume_off]=\"getVolume() === 0\"\n             tabindex=\"0\"\n             role=\"button\"\n             aria-label=\"mute button\"\n             [attr.aria-valuetext]=\"ariaValue\">\n        </div>",
                    styles: ["\n        vg-mute {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n\n        vg-mute .icon {\n            pointer-events: none;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgMute.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgMute.propDecorators = {
        "vgFor": [{ type: core_1.Input },],
        "onClick": [{ type: core_1.HostListener, args: ['click',] },],
        "onKeyDown": [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return VgMute;
}());
exports.VgMute = VgMute;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctbXV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLW11dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUg7QUFDakgscURBQW1EOztJQW1EL0MsZ0JBQVksR0FBZSxFQUFTLEdBQVU7UUFBVixRQUFHLEdBQUgsR0FBRyxDQUFPOzZCQUpkLEVBQUU7eUJBRXRCLFNBQVM7UUFHakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0tBQ2pDO0lBRUQseUJBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7U0FDNUY7S0FDSjtJQUVELDhCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQzNDO0lBR0Qsd0JBQU87UUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O0lBSTNCLDBCQUFTLGFBQUMsS0FBb0I7O1FBRTFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCOztJQUdMLGdDQUFlLEdBQWY7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDMUI7S0FDSjtJQUVELDBCQUFTLEdBQVQ7UUFDSSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDakI7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7S0FDcEQ7O2dCQW5HSixnQkFBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLGlmQVVDO29CQUNYLE1BQU0sRUFBRSxDQUFFLGlpQkFvQlQsQ0FBRTtpQkFDTjs7OztnQkF4QzBCLGlCQUFVO2dCQUM1QixjQUFLOzs7MEJBeUNULFlBQUs7NEJBNEJMLG1CQUFZLFNBQUMsT0FBTzs4QkFLcEIsbUJBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2lCQTNFdkM7O0FBeUNhLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmctbXV0ZScsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiXG4gICAgICAgICAgICAgW2NsYXNzLnZnLWljb24tdm9sdW1lX3VwXT1cImdldFZvbHVtZSgpID49IDAuNzVcIlxuICAgICAgICAgICAgIFtjbGFzcy52Zy1pY29uLXZvbHVtZV9kb3duXT1cImdldFZvbHVtZSgpID49IDAuMjUgJiYgZ2V0Vm9sdW1lKCkgPCAwLjc1XCJcbiAgICAgICAgICAgICBbY2xhc3MudmctaWNvbi12b2x1bWVfbXV0ZV09XCJnZXRWb2x1bWUoKSA+IDAgJiYgZ2V0Vm9sdW1lKCkgPCAwLjI1XCJcbiAgICAgICAgICAgICBbY2xhc3MudmctaWNvbi12b2x1bWVfb2ZmXT1cImdldFZvbHVtZSgpID09PSAwXCJcbiAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJtdXRlIGJ1dHRvblwiXG4gICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZXRleHRdPVwiYXJpYVZhbHVlXCI+XG4gICAgICAgIDwvZGl2PmAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctbXV0ZSB7XG4gICAgICAgICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLW11dGUgLmljb24ge1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cbiAgICBgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdNdXRlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHZnRm9yOiBzdHJpbmc7XG4gICAgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICBjdXJyZW50Vm9sdW1lOiBudW1iZXI7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgYXJpYVZhbHVlID0gJ3VubXV0ZWQnO1xuXG4gICAgY29uc3RydWN0b3IocmVmOiBFbGVtZW50UmVmLCBwdWJsaWMgQVBJOiBWZ0FQSSkge1xuICAgICAgICB0aGlzLmVsZW0gPSByZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuQVBJLmlzUGxheWVyUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSB0aGlzLnRhcmdldC52b2x1bWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTXV0ZVN0YXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIC8vIE9uIHByZXNzIEVudGVyICgxMykgb3IgU3BhY2UgKDMyKVxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZU11dGVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlTXV0ZVN0YXRlKCkge1xuICAgICAgICBsZXQgdm9sdW1lID0gdGhpcy5nZXRWb2x1bWUoKTtcblxuICAgICAgICBpZiAodm9sdW1lID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC52b2x1bWUgPSB0aGlzLmN1cnJlbnRWb2x1bWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWb2x1bWUgPSB2b2x1bWU7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC52b2x1bWUgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Vm9sdW1lKCkge1xuICAgICAgICBjb25zdCB2b2x1bWUgPSB0aGlzLnRhcmdldCA/IHRoaXMudGFyZ2V0LnZvbHVtZSA6IDA7XG4gICAgICAgIHRoaXMuYXJpYVZhbHVlID0gdm9sdW1lID8gJ3VubXV0ZWQnIDogJ211dGVkJztcbiAgICAgICAgcmV0dXJuIHZvbHVtZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbn1cbiJdfQ==

/***/ }),

/***/ 911:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var VgVolume = (function () {
    function VgVolume(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.isDragging = false;
    }
    VgVolume.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgVolume.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        this.ariaValue = this.getVolume() * 100;
    };
    VgVolume.prototype.onClick = function (event) {
        this.setVolume(this.calculateVolume(event.clientX));
    };
    VgVolume.prototype.onMouseDown = function (event) {
        this.mouseDownPosX = event.clientX;
        this.isDragging = true;
    };
    VgVolume.prototype.onDrag = function (event) {
        if (this.isDragging) {
            this.setVolume(this.calculateVolume(event.clientX));
        }
    };
    VgVolume.prototype.onStopDrag = function (event) {
        if (this.isDragging) {
            this.isDragging = false;
            if (this.mouseDownPosX === event.clientX) {
                this.setVolume(this.calculateVolume(event.clientX));
            }
        }
    };
    VgVolume.prototype.arrowAdjustVolume = function (event) {
        if (event.keyCode === 38 || event.keyCode === 39) {
            event.preventDefault();
            this.setVolume(Math.max(0, Math.min(100, (this.getVolume() * 100) + 10)));
        }
        else if (event.keyCode === 37 || event.keyCode === 40) {
            event.preventDefault();
            this.setVolume(Math.max(0, Math.min(100, (this.getVolume() * 100) - 10)));
        }
    };
    VgVolume.prototype.calculateVolume = function (mousePosX) {
        var recObj = this.volumeBarRef.nativeElement.getBoundingClientRect();
        var volumeBarOffsetLeft = recObj.left;
        var volumeBarWidth = recObj.width;
        return (mousePosX - volumeBarOffsetLeft) / volumeBarWidth * 100;
    };
    VgVolume.prototype.setVolume = function (vol) {
        this.target.volume = Math.max(0, Math.min(1, vol / 100));
        this.ariaValue = this.target.volume * 100;
    };
    VgVolume.prototype.getVolume = function () {
        return this.target ? this.target.volume : 0;
    };
    VgVolume.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgVolume.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-volume',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <div \n            #volumeBar\n            class=\"volumeBar\"\n            tabindex=\"0\"\n            role=\"slider\"\n            aria-label=\"volume level\"\n            aria-level=\"polite\"\n            [attr.aria-valuenow]=\"ariaValue\"\n            aria-valuemin=\"0\"\n            aria-valuemax=\"100\"\n            [attr.aria-valuetext]=\"ariaValue + '%'\"\n            (click)=\"onClick($event)\"\n            (mousedown)=\"onMouseDown($event)\">\n            <div class=\"volumeBackground\" [ngClass]=\"{dragging: isDragging}\">\n                <div class=\"volumeValue\" [style.width]=\"(getVolume() * (100-15)) + '%'\"></div>\n                <div class=\"volumeKnob\" [style.left]=\"(getVolume() * (100-15)) + '%'\"></div>\n            </div>\n        </div>\n    ",
                    styles: ["\n        vg-volume {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 100px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n        vg-volume .volumeBar {\n            position: relative;\n            display: flex;\n            flex-grow: 1;\n            align-items: center;\n        }\n        vg-volume .volumeBackground {\n            display: flex;\n            flex-grow: 1;\n            height: 5px;\n            pointer-events: none;\n            background-color: #333;\n        }\n        vg-volume .volumeValue {\n            display: flex;\n            height: 5px;\n            pointer-events: none;\n            background-color: #FFF;\n            transition:all 0.2s ease-out;\n        }\n        vg-volume .volumeKnob {\n            position: absolute;\n            width: 15px; height: 15px;\n            left: 0; top: 50%;\n            transform: translateY(-50%);\n            border-radius: 15px;\n            pointer-events: none;\n            background-color: #FFF;\n            transition:all 0.2s ease-out;\n        }\n        vg-volume .volumeBackground.dragging .volumeValue,\n        vg-volume .volumeBackground.dragging .volumeKnob {\n            transition: none;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgVolume.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgVolume.propDecorators = {
        "vgFor": [{ type: core_1.Input },],
        "volumeBarRef": [{ type: core_1.ViewChild, args: ['volumeBar',] },],
        "onDrag": [{ type: core_1.HostListener, args: ['document:mousemove', ['$event'],] },],
        "onStopDrag": [{ type: core_1.HostListener, args: ['document:mouseup', ['$event'],] },],
        "arrowAdjustVolume": [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return VgVolume;
}());
exports.VgVolume = VgVolume;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctdm9sdW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBR3VCO0FBQ3ZCLHFEQUFtRDs7SUF5Ri9DLGtCQUFZLEdBQWUsRUFBUyxHQUFVO1FBQVYsUUFBRyxHQUFILEdBQUcsQ0FBTzs2QkFGZCxFQUFFO1FBRzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztLQUMzQjtJQUVELDJCQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO1NBQzVGO0tBQ0o7SUFFRCxnQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDO0tBQzNDO0lBRUQsMEJBQU8sR0FBUCxVQUFRLEtBQTBCO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUN2RDtJQUVELDhCQUFXLEdBQVgsVUFBWSxLQUEwQjtRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUss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UUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsd3hCQW1CVDtvQkFDRCxNQUFNLEVBQUUsQ0FBRSxnL0NBaURULENBQUU7aUJBQ047Ozs7Z0JBL0VxQixpQkFBVTtnQkFHdkIsY0FBSzs7OzBCQThFVCxZQUFLO2lDQUNMLGdCQUFTLFNBQUMsV0FBVzsyQkFzQ3JCLG1CQUFZLFNBQUMsb0JBQW9CLEVBQUUsQ0FBRSxRQUFRLENBQUU7K0JBTy9DLG1CQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBRSxRQUFRLENBQUU7c0NBVTdDLG1CQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOzttQkExSXZDOztBQWlGYSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBWaWV3Q2hpbGQsXG4gICAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmctdm9sdW1lJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgICAjdm9sdW1lQmFyXG4gICAgICAgICAgICBjbGFzcz1cInZvbHVtZUJhclwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgcm9sZT1cInNsaWRlclwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwidm9sdW1lIGxldmVsXCJcbiAgICAgICAgICAgIGFyaWEtbGV2ZWw9XCJwb2xpdGVcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJhcmlhVmFsdWVcIlxuICAgICAgICAgICAgYXJpYS12YWx1ZW1pbj1cIjBcIlxuICAgICAgICAgICAgYXJpYS12YWx1ZW1heD1cIjEwMFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVldGV4dF09XCJhcmlhVmFsdWUgKyAnJSdcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWVCYWNrZ3JvdW5kXCIgW25nQ2xhc3NdPVwie2RyYWdnaW5nOiBpc0RyYWdnaW5nfVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWVWYWx1ZVwiIFtzdHlsZS53aWR0aF09XCIoZ2V0Vm9sdW1lKCkgKiAoMTAwLTE1KSkgKyAnJSdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lS25vYlwiIFtzdHlsZS5sZWZ0XT1cIihnZXRWb2x1bWUoKSAqICgxMDAtMTUpKSArICclJ1wiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctdm9sdW1lIHtcbiAgICAgICAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB3aWR0aDogMTAwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICAgICAgfVxuICAgICAgICB2Zy12b2x1bWUgLnZvbHVtZUJhciB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgICB2Zy12b2x1bWUgLnZvbHVtZUJhY2tncm91bmQge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgIGhlaWdodDogNXB4O1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xuICAgICAgICB9XG4gICAgICAgIHZnLXZvbHVtZSAudm9sdW1lVmFsdWUge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGhlaWdodDogNXB4O1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjphbGwgMC4ycyBlYXNlLW91dDtcbiAgICAgICAgfVxuICAgICAgICB2Zy12b2x1bWUgLnZvbHVtZUtub2Ige1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgd2lkdGg6IDE1cHg7IGhlaWdodDogMTVweDtcbiAgICAgICAgICAgIGxlZnQ6IDA7IHRvcDogNTAlO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgICAgICAgICAgIHRyYW5zaXRpb246YWxsIDAuMnMgZWFzZS1vdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmctdm9sdW1lIC52b2x1bWVCYWNrZ3JvdW5kLmRyYWdnaW5nIC52b2x1bWVWYWx1ZSxcbiAgICAgICAgdmctdm9sdW1lIC52b2x1bWVCYWNrZ3JvdW5kLmRyYWdnaW5nIC52b2x1bWVLbm9iIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICBgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdWb2x1bWUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgdmdGb3I6IHN0cmluZztcbiAgICBAVmlld0NoaWxkKCd2b2x1bWVCYXInKSB2b2x1bWVCYXJSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICB0YXJnZXQ6IGFueTtcbiAgICBpc0RyYWdnaW5nOiBib29sZWFuO1xuICAgIG1vdXNlRG93blBvc1g6IG51bWJlcjtcbiAgICBhcmlhVmFsdWU6IG51bWJlcjtcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6IFZnQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuQVBJLmlzUGxheWVyUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuICAgICAgICB0aGlzLmFyaWFWYWx1ZSA9IHRoaXMuZ2V0Vm9sdW1lKCkgKiAxMDA7XG4gICAgfVxuXG4gICAgb25DbGljayhldmVudDogeyBjbGllbnRYOiBudW1iZXIgfSkge1xuICAgICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmNhbGN1bGF0ZVZvbHVtZShldmVudC5jbGllbnRYKSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IHsgY2xpZW50WDogbnVtYmVyIH0pIHtcbiAgICAgICAgdGhpcy5tb3VzZURvd25Qb3NYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZW1vdmUnLCBbICckZXZlbnQnIF0pXG4gICAgb25EcmFnKGV2ZW50OiB7IGNsaWVudFg6IG51bWJlciB9KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY2FsY3VsYXRlVm9sdW1lKGV2ZW50LmNsaWVudFgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNldXAnLCBbICckZXZlbnQnIF0pXG4gICAgb25TdG9wRHJhZyhldmVudDogeyBjbGllbnRYOiBudW1iZXIgfSkge1xuICAgICAgICBpZiAodGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlRG93blBvc1ggPT09IGV2ZW50LmNsaWVudFgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmNhbGN1bGF0ZVZvbHVtZShldmVudC5jbGllbnRYKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBhcnJvd0FkanVzdFZvbHVtZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzggfHwgZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFZvbHVtZShNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsKHRoaXMuZ2V0Vm9sdW1lKCkgKiAxMDApICsgMTApKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFZvbHVtZShNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsKHRoaXMuZ2V0Vm9sdW1lKCkgKiAxMDApIC0gMTApKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVWb2x1bWUobW91c2VQb3NYOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcmVjT2JqID0gdGhpcy52b2x1bWVCYXJSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3Qgdm9sdW1lQmFyT2Zmc2V0TGVmdDogbnVtYmVyID0gcmVjT2JqLmxlZnQ7XG4gICAgICAgIGNvbnN0IHZvbHVtZUJhcldpZHRoOiBudW1iZXIgPSByZWNPYmoud2lkdGg7XG4gICAgICAgIHJldHVybiAobW91c2VQb3NYIC0gdm9sdW1lQmFyT2Zmc2V0TGVmdCkgLyB2b2x1bWVCYXJXaWR0aCAqIDEwMDtcbiAgICB9XG5cbiAgICBzZXRWb2x1bWUodm9sOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50YXJnZXQudm9sdW1lID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdm9sIC8gMTAwKSk7XG4gICAgICAgIHRoaXMuYXJpYVZhbHVlID0gdGhpcy50YXJnZXQudm9sdW1lICogMTAwO1xuICAgIH1cblxuICAgIGdldFZvbHVtZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQgPyB0aGlzLnRhcmdldC52b2x1bWUgOiAwO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19

/***/ }),

/***/ 912:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var vg_states_1 = __webpack_require__(86);
var VgPlayPause = (function () {
    function VgPlayPause(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.ariaValue = vg_states_1.VgStates.VG_PAUSED;
        this.elem = ref.nativeElement;
    }
    VgPlayPause.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgPlayPause.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgPlayPause.prototype.onClick = function () {
        this.playPause();
    };
    VgPlayPause.prototype.onKeyDown = function (event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.playPause();
        }
    };
    VgPlayPause.prototype.playPause = function () {
        var state = this.getState();
        switch (state) {
            case vg_states_1.VgStates.VG_PLAYING:
                this.target.pause();
                break;
            case vg_states_1.VgStates.VG_PAUSED:
            case vg_states_1.VgStates.VG_ENDED:
                this.target.play();
                break;
        }
    };
    VgPlayPause.prototype.getState = function () {
        this.ariaValue = this.target ? this.target.state : vg_states_1.VgStates.VG_PAUSED;
        return this.ariaValue;
    };
    VgPlayPause.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgPlayPause.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-play-pause',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <div class=\"icon\"\n             [class.vg-icon-pause]=\"getState() === 'playing'\"\n             [class.vg-icon-play_arrow]=\"getState() === 'paused' || getState() === 'ended'\"\n             tabindex=\"0\"\n             role=\"button\"\n             aria-label=\"play pause button\"\n             [attr.aria-valuetext]=\"ariaValue\">\n        </div>",
                    styles: ["\n        vg-play-pause {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n\n        vg-play-pause .icon {\n            pointer-events: none;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgPlayPause.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgPlayPause.propDecorators = {
        "vgFor": [{ type: core_1.Input },],
        "onClick": [{ type: core_1.HostListener, args: ['click',] },],
        "onKeyDown": [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return VgPlayPause;
}());
exports.VgPlayPause = VgPlayPause;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheS1wYXVzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLXBsYXktcGF1c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUg7QUFDakgscURBQW1EO0FBQ25ELHlEQUF1RDs7SUErQ25ELHFCQUFZLEdBQWUsRUFBUyxHQUFVO1FBQVYsUUFBRyxHQUFILEdBQUcsQ0FBTzs2QkFKZCxFQUFFO3lCQUV0QixvQkFBUSxDQUFDLFNBQVM7UUFHMUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0tBQ2pDO0lBRUQsOEJBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7U0FDNUY7S0FDSjtJQUVELG1DQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuRDtJQUdELDZCQUFPO1FBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztJQUlyQiwrQkFBUyxhQUFDLEtBQW9COztRQUUxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjs7SUFHTCwrQkFBUyxHQUFUO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixLQUFLLG9CQUFRLENBQUMsVUFBVTtnQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxDQUFDO1lBRVYsS0FBSyxvQkFBUSxDQUFDLFNBQVMsQ0FBQztZQUN4QixLQUFLLG9CQUFRLENBQUMsUUFBUTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxDQUFDO1NBQ2I7S0FDSjtJQUVELDhCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxTQUFTLENBQUM7UUFDdEUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7SUFFRCxpQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7S0FDcEQ7O2dCQWpHSixnQkFBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLDRXQVFDO29CQUNYLE1BQU0sRUFBRSxDQUFFLDZpQkFvQlQsQ0FBRTtpQkFDTjs7OztnQkF0Q21CLGlCQUFVO2dCQUNyQixjQUFLOzs7MEJBdUNULFlBQUs7NEJBMEJMLG1CQUFZLFNBQUMsT0FBTzs4QkFLcEIsbUJBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3NCQXZFdkM7O0FBdUNhLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uSW5pdCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHsgVmdTdGF0ZXMgfSBmcm9tICcuLi8uLi9jb3JlL3N0YXRlcy92Zy1zdGF0ZXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ZnLXBsYXktcGF1c2UnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIlxuICAgICAgICAgICAgIFtjbGFzcy52Zy1pY29uLXBhdXNlXT1cImdldFN0YXRlKCkgPT09ICdwbGF5aW5nJ1wiXG4gICAgICAgICAgICAgW2NsYXNzLnZnLWljb24tcGxheV9hcnJvd109XCJnZXRTdGF0ZSgpID09PSAncGF1c2VkJyB8fCBnZXRTdGF0ZSgpID09PSAnZW5kZWQnXCJcbiAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJwbGF5IHBhdXNlIGJ1dHRvblwiXG4gICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZXRleHRdPVwiYXJpYVZhbHVlXCI+XG4gICAgICAgIDwvZGl2PmAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctcGxheS1wYXVzZSB7XG4gICAgICAgICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLXBsYXktcGF1c2UgLmljb24ge1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cbiAgICBgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdQbGF5UGF1c2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgdmdGb3I6IHN0cmluZztcblxuICAgIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIHRhcmdldDogYW55O1xuXG4gICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGFyaWFWYWx1ZSA9IFZnU3RhdGVzLlZHX1BBVVNFRDtcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgcHVibGljIEFQSTogVmdBUEkpIHtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLkFQSS5pc1BsYXllclJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLm9uUGxheWVyUmVhZHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuQVBJLnBsYXllclJlYWR5RXZlbnQuc3Vic2NyaWJlKCgpID0+IHRoaXMub25QbGF5ZXJSZWFkeSgpKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgb25DbGljaygpIHtcbiAgICAgICAgdGhpcy5wbGF5UGF1c2UoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgLy8gT24gcHJlc3MgRW50ZXIgKDEzKSBvciBTcGFjZSAoMzIpXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5rZXlDb2RlID09PSAzMikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMucGxheVBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwbGF5UGF1c2UoKSB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKTtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFZnU3RhdGVzLlZHX1BMQVlJTkc6XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBWZ1N0YXRlcy5WR19QQVVTRUQ6XG4gICAgICAgICAgICBjYXNlIFZnU3RhdGVzLlZHX0VOREVEOlxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICB0aGlzLmFyaWFWYWx1ZSA9IHRoaXMudGFyZ2V0ID8gdGhpcy50YXJnZXQuc3RhdGUgOiBWZ1N0YXRlcy5WR19QQVVTRUQ7XG4gICAgICAgIHJldHVybiB0aGlzLmFyaWFWYWx1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbn1cbiJdfQ==

/***/ }),

/***/ 913:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var VgPlaybackButton = (function () {
    function VgPlaybackButton(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.ariaValue = 1;
        this.elem = ref.nativeElement;
        this.playbackValues = ['0.5', '1.0', '1.5', '2.0'];
        this.playbackIndex = 1;
    }
    VgPlaybackButton.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgPlaybackButton.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgPlaybackButton.prototype.onClick = function () {
        this.updatePlaybackSpeed();
    };
    VgPlaybackButton.prototype.onKeyDown = function (event) {
        // On press Enter (13) or Space (32)
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            this.updatePlaybackSpeed();
        }
    };
    VgPlaybackButton.prototype.updatePlaybackSpeed = function () {
        this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;
        if (this.target instanceof vg_api_1.VgAPI) {
            this.target.playbackRate = (this.playbackValues[this.playbackIndex]);
        }
        else {
            this.target.playbackRate[this.vgFor] = (this.playbackValues[this.playbackIndex]);
        }
    };
    VgPlaybackButton.prototype.getPlaybackRate = function () {
        this.ariaValue = this.target ? this.target.playbackRate : 1.0;
        return this.ariaValue;
    };
    VgPlaybackButton.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgPlaybackButton.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-playback-button',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n    <span class=\"button\"\n          tabindex=\"0\"\n          role=\"button\"\n          aria-label=\"playback speed button\"\n          [attr.aria-valuetext]=\"ariaValue\">\n        {{getPlaybackRate()}}x\n    </span>",
                    styles: ["\n        vg-playback-button {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n        }\n\n        vg-playback-button .button {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            width: 50px;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgPlaybackButton.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgPlaybackButton.propDecorators = {
        "vgFor": [{ type: core_1.Input },],
        "playbackValues": [{ type: core_1.Input },],
        "onClick": [{ type: core_1.HostListener, args: ['click',] },],
        "onKeyDown": [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return VgPlaybackButton;
}());
exports.VgPlaybackButton = VgPlaybackButton;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWJhY2stYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctcGxheWJhY2stYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlIO0FBQ2pILHFEQUFtRDs7SUFvRC9DLDBCQUFZLEdBQWUsRUFBUyxHQUFVO1FBQVYsUUFBRyxHQUFILEdBQUcsQ0FBTzs2QkFKZCxFQUFFO3lCQUV0QixDQUFDO1FBR1QsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztLQUMxQjtJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO1NBQzVGO0tBQ0o7SUFFRCx3Q0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkQ7SUFHRCxrQ0FBTztRQUNILElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDOztJQUkvQixvQ0FBUyxhQUFDLEtBQW9COztRQUUxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCOztJQUdMLDhDQUFtQixHQUFuQjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLFlBQVksY0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDLENBQUM7U0FDMUU7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDLENBQUM7U0FDeEY7S0FDSjtJQUVELDBDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3pCO0lBRUQsc0NBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0tBQ3BEOztnQkFwR0osZ0JBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLGdPQU9GO29CQUNSLE1BQU0sRUFBRSxDQUFFLHFyQkF1QlQsQ0FBRTtpQkFDTjs7OztnQkF2QzBCLGlCQUFVO2dCQUM1QixjQUFLOzs7MEJBd0NULFlBQUs7bUNBS0wsWUFBSzs0QkEwQkwsbUJBQVksU0FBQyxPQUFPOzhCQUtwQixtQkFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7MkJBN0V2Qzs7QUF3Q2EsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ZnLXBsYXliYWNrLWJ1dHRvbicsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uXCJcbiAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJwbGF5YmFjayBzcGVlZCBidXR0b25cIlxuICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWV0ZXh0XT1cImFyaWFWYWx1ZVwiPlxuICAgICAgICB7e2dldFBsYXliYWNrUmF0ZSgpfX14XG4gICAgPC9zcGFuPmAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctcGxheWJhY2stYnV0dG9uIHtcbiAgICAgICAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEhlbHZldGljYSBOZXVlLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctcGxheWJhY2stYnV0dG9uIC5idXR0b24ge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICB9XG4gICAgYCBdXG59KVxuZXhwb3J0IGNsYXNzIFZnUGxheWJhY2tCdXR0b24gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgdmdGb3I6IHN0cmluZztcblxuICAgIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIHRhcmdldDogYW55O1xuXG4gICAgQElucHV0KCkgcGxheWJhY2tWYWx1ZXM6IEFycmF5PHN0cmluZz47XG4gICAgcGxheWJhY2tJbmRleDogbnVtYmVyO1xuXG4gICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGFyaWFWYWx1ZSA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6IFZnQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLnBsYXliYWNrVmFsdWVzID0gWyAnMC41JywgJzEuMCcsICcxLjUnLCAnMi4wJyBdO1xuICAgICAgICB0aGlzLnBsYXliYWNrSW5kZXggPSAxO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGxheWJhY2tTcGVlZCgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICAvLyBPbiBwcmVzcyBFbnRlciAoMTMpIG9yIFNwYWNlICgzMilcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5YmFja1NwZWVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbGF5YmFja1NwZWVkKCkge1xuICAgICAgICB0aGlzLnBsYXliYWNrSW5kZXggPSArK3RoaXMucGxheWJhY2tJbmRleCAlIHRoaXMucGxheWJhY2tWYWx1ZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCBpbnN0YW5jZW9mIFZnQVBJKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5wbGF5YmFja1JhdGUgPSAodGhpcy5wbGF5YmFja1ZhbHVlc1sgdGhpcy5wbGF5YmFja0luZGV4IF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQucGxheWJhY2tSYXRlWyB0aGlzLnZnRm9yIF0gPSAodGhpcy5wbGF5YmFja1ZhbHVlc1sgdGhpcy5wbGF5YmFja0luZGV4IF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGxheWJhY2tSYXRlKCkge1xuICAgICAgICB0aGlzLmFyaWFWYWx1ZSA9IHRoaXMudGFyZ2V0ID8gdGhpcy50YXJnZXQucGxheWJhY2tSYXRlIDogMS4wO1xuICAgICAgICByZXR1cm4gdGhpcy5hcmlhVmFsdWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG59XG4iXX0=

/***/ }),

/***/ 914:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var vg_controls_hidden_1 = __webpack_require__(87);
var vg_states_1 = __webpack_require__(86);
var VgScrubBar = (function () {
    function VgScrubBar(ref, API, vgControlsHiddenState) {
        var _this = this;
        this.API = API;
        this.hideScrubBar = false;
        this.vgSlider = true;
        this.isSeeking = false;
        this.wasPlaying = false;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.subscriptions.push(vgControlsHiddenState.isHidden.subscribe(function (hide) { return _this.onHideScrubBar(hide); }));
    }
    VgScrubBar.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgScrubBar.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBar.prototype.seekStart = function () {
        if (this.target.canPlay) {
            this.isSeeking = true;
            if (this.target.state === vg_states_1.VgStates.VG_PLAYING) {
                this.wasPlaying = true;
            }
            this.target.pause();
        }
    };
    VgScrubBar.prototype.seekMove = function (offset) {
        if (this.isSeeking) {
            var percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
            this.target.time.current = percentage * this.target.time.total / 100;
            this.target.seekTime(percentage, true);
        }
    };
    VgScrubBar.prototype.seekEnd = function (offset) {
        this.isSeeking = false;
        if (this.target.canPlay) {
            var percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
            this.target.seekTime(percentage, true);
            if (this.wasPlaying) {
                this.wasPlaying = false;
                this.target.play();
            }
        }
    };
    VgScrubBar.prototype.touchEnd = function () {
        this.isSeeking = false;
        if (this.wasPlaying) {
            this.wasPlaying = false;
            this.target.play();
        }
    };
    VgScrubBar.prototype.getTouchOffset = function (event) {
        var offsetLeft = 0;
        var element = event.target;
        while (element) {
            offsetLeft += element.offsetLeft;
            element = element.offsetParent;
        }
        return event.touches[0].pageX - offsetLeft;
    };
    VgScrubBar.prototype.onMouseDownScrubBar = function ($event) {
        if (!this.target.isLive) {
            if (!this.vgSlider) {
                this.seekEnd($event.offsetX);
            }
            else {
                this.seekStart();
            }
        }
    };
    VgScrubBar.prototype.onMouseMoveScrubBar = function ($event) {
        if (!this.target.isLive && this.vgSlider && this.isSeeking) {
            this.seekMove($event.offsetX);
        }
    };
    VgScrubBar.prototype.onMouseOutScrubBar = function ($event) {
        if (!this.target.isLive && this.vgSlider && this.isSeeking) {
            this.seekEnd($event.offsetX);
        }
    };
    VgScrubBar.prototype.onMouseUpScrubBar = function ($event) {
        if (!this.target.isLive && this.vgSlider) {
            this.seekEnd($event.offsetX);
        }
    };
    VgScrubBar.prototype.onTouchStartScrubBar = function ($event) {
        if (!this.target.isLive) {
            if (!this.vgSlider) {
                this.seekEnd(this.getTouchOffset($event));
            }
            else {
                this.seekStart();
            }
        }
    };
    VgScrubBar.prototype.onTouchMoveScrubBar = function ($event) {
        if (!this.target.isLive && this.vgSlider && this.isSeeking) {
            this.seekMove(this.getTouchOffset($event));
        }
    };
    VgScrubBar.prototype.onTouchCancelScrubBar = function ($event) {
        if (!this.target.isLive && this.vgSlider) {
            this.touchEnd();
        }
    };
    VgScrubBar.prototype.onTouchEndScrubBar = function ($event) {
        if (!this.target.isLive && this.vgSlider) {
            this.touchEnd();
        }
    };
    VgScrubBar.prototype.onTouchLeaveScrubBar = function ($event) {
        if (!this.target.isLive && this.vgSlider) {
            this.touchEnd();
        }
    };
    VgScrubBar.prototype.arrowAdjustVolume = function (event) {
        if (event.keyCode === 38 || event.keyCode === 39) {
            event.preventDefault();
            this.target.seekTime((this.target.time.current + 5000) / 1000, false);
        }
        else if (event.keyCode === 37 || event.keyCode === 40) {
            event.preventDefault();
            this.target.seekTime((this.target.time.current - 5000) / 1000, false);
        }
    };
    VgScrubBar.prototype.getPercentage = function () {
        return this.target ? ((this.target.time.current * 100) / this.target.time.total) + '%' : '0%';
    };
    VgScrubBar.prototype.onHideScrubBar = function (hide) {
        this.hideScrubBar = hide;
    };
    VgScrubBar.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgScrubBar.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-scrub-bar',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <div class=\"scrubBar\"\n             tabindex=\"0\"\n             role=\"slider\"\n             aria-label=\"scrub bar\"\n             aria-level=\"polite\"\n             [attr.aria-valuenow]=\"getPercentage()\"\n             aria-valuemin=\"0\"\n             aria-valuemax=\"100\"\n             [attr.aria-valuetext]=\"getPercentage() + '%'\">\n            <ng-content></ng-content>\n        </div>\n        \n    ",
                    styles: ["\n        vg-scrub-bar {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            position: absolute;\n            width: 100%;\n            height: 5px;\n            bottom: 50px;\n            margin: 0;\n            cursor: pointer;\n            align-items: center;\n            background: rgba(0, 0, 0, 0.75);\n            z-index: 250;\n            -webkit-transition: bottom 1s, opacity 0.5s;\n            -khtml-transition: bottom 1s, opacity 0.5s;\n            -moz-transition: bottom 1s, opacity 0.5s;\n            -ms-transition: bottom 1s, opacity 0.5s;\n            transition: bottom 1s, opacity 0.5s;\n        }\n        \n        vg-scrub-bar .scrubBar {\n            position: relative;\n            display: flex;\n            flex-grow: 1;\n            align-items: center;\n            height: 100%;\n        }\n\n        vg-controls vg-scrub-bar {\n            position: relative;\n            bottom: 0;\n            background: transparent;\n            height: 50px;\n            flex-grow: 1;\n            flex-basis: 0;\n            margin: 0 10px;\n            -webkit-transition: initial;\n            -khtml-transition: initial;\n            -moz-transition: initial;\n            -ms-transition: initial;\n            transition: initial;\n        }\n\n        vg-scrub-bar.hide {\n            bottom: 0;\n            opacity: 0;\n        }\n\n        vg-controls vg-scrub-bar.hide {\n            bottom: initial;\n            opacity: initial;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgScrubBar.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
        { type: vg_controls_hidden_1.VgControlsHidden, },
    ]; };
    VgScrubBar.propDecorators = {
        "hideScrubBar": [{ type: core_1.HostBinding, args: ['class.hide',] },],
        "vgFor": [{ type: core_1.Input },],
        "vgSlider": [{ type: core_1.Input },],
        "onMouseDownScrubBar": [{ type: core_1.HostListener, args: ['mousedown', ['$event'],] },],
        "onMouseMoveScrubBar": [{ type: core_1.HostListener, args: ['mousemove', ['$event'],] },],
        "onMouseOutScrubBar": [{ type: core_1.HostListener, args: ['mouseout', ['$event'],] },],
        "onMouseUpScrubBar": [{ type: core_1.HostListener, args: ['mouseup', ['$event'],] },],
        "onTouchStartScrubBar": [{ type: core_1.HostListener, args: ['touchstart', ['$event'],] },],
        "onTouchMoveScrubBar": [{ type: core_1.HostListener, args: ['touchmove', ['$event'],] },],
        "onTouchCancelScrubBar": [{ type: core_1.HostListener, args: ['touchcancel', ['$event'],] },],
        "onTouchEndScrubBar": [{ type: core_1.HostListener, args: ['touchend', ['$event'],] },],
        "onTouchLeaveScrubBar": [{ type: core_1.HostListener, args: ['touchleave', ['$event'],] },],
        "arrowAdjustVolume": [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
    };
    return VgScrubBar;
}());
exports.VgScrubBar = VgScrubBar;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctc2NydWItYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBR3VCO0FBQ3ZCLHFEQUFtRDtBQUNuRCwrRUFBNEU7QUFDNUUseURBQXVEOztJQTBGbkQsb0JBQVksR0FBZSxFQUFTLEdBQVUsRUFBRSxxQkFBdUM7UUFBdkYsaUJBR0M7UUFIbUMsUUFBRyxHQUFILEdBQUcsQ0FBTzs0QkFaSyxLQUFLO3dCQUczQixJQUFJO3lCQUlaLEtBQUs7MEJBQ0osS0FBSzs2QkFFSyxFQUFFO1FBRzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDLENBQUM7S0FDeEc7SUFFRCw2QkFBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQztTQUM1RjtLQUNKO0lBRUQsa0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25EO0lBRVMsOEJBQVMsR0FBbkI7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QVEsQ0FBRTt3Q0FZdEMsbUJBQVksU0FBQyxXQUFXLEVBQUUsQ0FBRSxRQUFRLENBQUU7dUNBT3RDLG1CQUFZLFNBQUMsVUFBVSxFQUFFLENBQUUsUUFBUSxDQUFFO3NDQU9yQyxtQkFBWSxTQUFDLFNBQVMsRUFBRSxDQUFFLFFBQVEsQ0FBRTt5Q0FPcEMsbUJBQVksU0FBQyxZQUFZLEVBQUUsQ0FBRSxRQUFRLENBQUU7d0NBWXZDLG1CQUFZLFNBQUMsV0FBVyxFQUFFLENBQUUsUUFBUSxDQUFFOzBDQU90QyxtQkFBWSxTQUFDLGFBQWEsRUFBRSxDQUFFLFFBQVEsQ0FBRTt1Q0FPeEMsbUJBQVksU0FBQyxVQUFVLEVBQUUsQ0FBRSxRQUFRLENBQUU7eUNBT3JDLG1CQUFZLFNBQUMsWUFBWSxFQUFFLENBQUUsUUFBUSxDQUFFO3NDQU92QyxtQkFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7cUJBM092Qzs7QUFtRmEsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIEhvc3RMaXN0ZW5lciwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgSG9zdEJpbmRpbmcsXG4gICAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzSGlkZGVuIH0gZnJvbSAnLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5pbXBvcnQgeyBWZ1N0YXRlcyB9IGZyb20gJy4uLy4uL2NvcmUvc3RhdGVzL3ZnLXN0YXRlcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmctc2NydWItYmFyJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzY3J1YkJhclwiXG4gICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICByb2xlPVwic2xpZGVyXCJcbiAgICAgICAgICAgICBhcmlhLWxhYmVsPVwic2NydWIgYmFyXCJcbiAgICAgICAgICAgICBhcmlhLWxldmVsPVwicG9saXRlXCJcbiAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cImdldFBlcmNlbnRhZ2UoKVwiXG4gICAgICAgICAgICAgYXJpYS12YWx1ZW1pbj1cIjBcIlxuICAgICAgICAgICAgIGFyaWEtdmFsdWVtYXg9XCIxMDBcIlxuICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWV0ZXh0XT1cImdldFBlcmNlbnRhZ2UoKSArICclJ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgYCxcbiAgICBzdHlsZXM6IFsgYFxuICAgICAgICB2Zy1zY3J1Yi1iYXIge1xuICAgICAgICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1cHg7XG4gICAgICAgICAgICBib3R0b206IDUwcHg7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjc1KTtcbiAgICAgICAgICAgIHotaW5kZXg6IDI1MDtcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYm90dG9tIDFzLCBvcGFjaXR5IDAuNXM7XG4gICAgICAgICAgICAta2h0bWwtdHJhbnNpdGlvbjogYm90dG9tIDFzLCBvcGFjaXR5IDAuNXM7XG4gICAgICAgICAgICAtbW96LXRyYW5zaXRpb246IGJvdHRvbSAxcywgb3BhY2l0eSAwLjVzO1xuICAgICAgICAgICAgLW1zLXRyYW5zaXRpb246IGJvdHRvbSAxcywgb3BhY2l0eSAwLjVzO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYm90dG9tIDFzLCBvcGFjaXR5IDAuNXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZnLXNjcnViLWJhciAuc2NydWJCYXIge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1jb250cm9scyB2Zy1zY3J1Yi1iYXIge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICBmbGV4LWJhc2lzOiAwO1xuICAgICAgICAgICAgbWFyZ2luOiAwIDEwcHg7XG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zaXRpb246IGluaXRpYWw7XG4gICAgICAgICAgICAta2h0bWwtdHJhbnNpdGlvbjogaW5pdGlhbDtcbiAgICAgICAgICAgIC1tb3otdHJhbnNpdGlvbjogaW5pdGlhbDtcbiAgICAgICAgICAgIC1tcy10cmFuc2l0aW9uOiBpbml0aWFsO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogaW5pdGlhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLXNjcnViLWJhci5oaWRlIHtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1jb250cm9scyB2Zy1zY3J1Yi1iYXIuaGlkZSB7XG4gICAgICAgICAgICBib3R0b206IGluaXRpYWw7XG4gICAgICAgICAgICBvcGFjaXR5OiBpbml0aWFsO1xuICAgICAgICB9XG4gICAgYCBdXG59KVxuZXhwb3J0IGNsYXNzIFZnU2NydWJCYXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oaWRlJykgaGlkZVNjcnViQmFyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB2Z0Zvcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHZnU2xpZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIHRhcmdldDogYW55O1xuICAgIGlzU2Vla2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHdhc1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6IFZnQVBJLCB2Z0NvbnRyb2xzSGlkZGVuU3RhdGU6IFZnQ29udHJvbHNIaWRkZW4pIHtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHZnQ29udHJvbHNIaWRkZW5TdGF0ZS5pc0hpZGRlbi5zdWJzY3JpYmUoaGlkZSA9PiB0aGlzLm9uSGlkZVNjcnViQmFyKGhpZGUpKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLkFQSS5pc1BsYXllclJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLm9uUGxheWVyUmVhZHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuQVBJLnBsYXllclJlYWR5RXZlbnQuc3Vic2NyaWJlKCgpID0+IHRoaXMub25QbGF5ZXJSZWFkeSgpKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2Vla1N0YXJ0KCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQuY2FuUGxheSkge1xuICAgICAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0LnN0YXRlID09PSBWZ1N0YXRlcy5WR19QTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2Vla01vdmUob2Zmc2V0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTZWVraW5nKSB7XG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGgubWF4KE1hdGgubWluKG9mZnNldCAqIDEwMCAvIHRoaXMuZWxlbS5zY3JvbGxXaWR0aCwgOTkuOSksIDApO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQudGltZS5jdXJyZW50ID0gcGVyY2VudGFnZSAqIHRoaXMudGFyZ2V0LnRpbWUudG90YWwgLyAxMDA7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zZWVrVGltZShwZXJjZW50YWdlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZWVrRW5kKG9mZnNldDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaXNTZWVraW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldC5jYW5QbGF5KSB7XG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGgubWF4KE1hdGgubWluKG9mZnNldCAqIDEwMCAvIHRoaXMuZWxlbS5zY3JvbGxXaWR0aCwgOTkuOSksIDApO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuc2Vla1RpbWUocGVyY2VudGFnZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAodGhpcy53YXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRvdWNoRW5kKCkge1xuICAgICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy53YXNQbGF5aW5nKSB7XG4gICAgICAgICAgICB0aGlzLndhc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRUb3VjaE9mZnNldChldmVudDogYW55KSB7XG4gICAgICAgIGxldCBvZmZzZXRMZWZ0OiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgZWxlbWVudDogYW55ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgICAgb2Zmc2V0TGVmdCArPSBlbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCAtIG9mZnNldExlZnQ7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyAnJGV2ZW50JyBdKVxuICAgIG9uTW91c2VEb3duU2NydWJCYXIoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5pc0xpdmUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52Z1NsaWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vla0VuZCgkZXZlbnQub2Zmc2V0WCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlZWtTdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyAnJGV2ZW50JyBdKVxuICAgIG9uTW91c2VNb3ZlU2NydWJCYXIoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5pc0xpdmUgJiYgdGhpcy52Z1NsaWRlciAmJiB0aGlzLmlzU2Vla2luZykge1xuICAgICAgICAgICAgdGhpcy5zZWVrTW92ZSgkZXZlbnQub2Zmc2V0WCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcsIFsgJyRldmVudCcgXSlcbiAgICBvbk1vdXNlT3V0U2NydWJCYXIoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5pc0xpdmUgJiYgdGhpcy52Z1NsaWRlciAmJiB0aGlzLmlzU2Vla2luZykge1xuICAgICAgICAgICAgdGhpcy5zZWVrRW5kKCRldmVudC5vZmZzZXRYKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbICckZXZlbnQnIF0pXG4gICAgb25Nb3VzZVVwU2NydWJCYXIoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5pc0xpdmUgJiYgdGhpcy52Z1NsaWRlcikge1xuICAgICAgICAgICAgdGhpcy5zZWVrRW5kKCRldmVudC5vZmZzZXRYKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbICckZXZlbnQnIF0pXG4gICAgb25Ub3VjaFN0YXJ0U2NydWJCYXIoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5pc0xpdmUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52Z1NsaWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vla0VuZCh0aGlzLmdldFRvdWNoT2Zmc2V0KCRldmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWVrU3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3RvdWNobW92ZScsIFsgJyRldmVudCcgXSlcbiAgICBvblRvdWNoTW92ZVNjcnViQmFyKCRldmVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy50YXJnZXQuaXNMaXZlICYmIHRoaXMudmdTbGlkZXIgJiYgdGhpcy5pc1NlZWtpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2Vla01vdmUodGhpcy5nZXRUb3VjaE9mZnNldCgkZXZlbnQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgWyAnJGV2ZW50JyBdKVxuICAgIG9uVG91Y2hDYW5jZWxTY3J1YkJhcigkZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0LmlzTGl2ZSAmJiB0aGlzLnZnU2xpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcsIFsgJyRldmVudCcgXSlcbiAgICBvblRvdWNoRW5kU2NydWJCYXIoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5pc0xpdmUgJiYgdGhpcy52Z1NsaWRlcikge1xuICAgICAgICAgICAgdGhpcy50b3VjaEVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigndG91Y2hsZWF2ZScsIFsgJyRldmVudCcgXSlcbiAgICBvblRvdWNoTGVhdmVTY3J1YkJhcigkZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0LmlzTGl2ZSAmJiB0aGlzLnZnU2xpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBhcnJvd0FkanVzdFZvbHVtZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzggfHwgZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zZWVrVGltZSgodGhpcy50YXJnZXQudGltZS5jdXJyZW50ICsgNTAwMCkgLyAxMDAwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zZWVrVGltZSgodGhpcy50YXJnZXQudGltZS5jdXJyZW50IC0gNTAwMCkgLyAxMDAwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQZXJjZW50YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQgPyAoKHRoaXMudGFyZ2V0LnRpbWUuY3VycmVudCAqIDEwMCkgLyB0aGlzLnRhcmdldC50aW1lLnRvdGFsKSArICclJyA6ICcwJSc7XG4gICAgfVxuXG4gICAgb25IaWRlU2NydWJCYXIoaGlkZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmhpZGVTY3J1YkJhciA9IGhpZGU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG59XG4iXX0=

/***/ }),

/***/ 915:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var VgScrubBarBufferingTime = (function () {
    function VgScrubBarBufferingTime(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    VgScrubBarBufferingTime.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgScrubBarBufferingTime.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBarBufferingTime.prototype.getBufferTime = function () {
        var bufferTime = "0%";
        if (this.target && this.target.buffer && this.target.buffered.length) {
            if (this.target.time.total === 0) {
                bufferTime = '0%';
            }
            else {
                bufferTime = ((this.target.buffer.end / this.target.time.total) * 100) + '%';
            }
        }
        return bufferTime;
    };
    VgScrubBarBufferingTime.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgScrubBarBufferingTime.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-scrub-bar-buffering-time',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "<div class=\"background\" [style.width]=\"getBufferTime()\"></div>",
                    styles: ["\n        vg-scrub-bar-buffering-time {\n            display: flex;\n            width: 100%;\n            height: 5px;\n            pointer-events: none;\n            position: absolute;\n        }\n\n        vg-scrub-bar-buffering-time .background {\n            background-color: rgba(255, 255, 255, 0.3);\n        }\n\n        vg-controls vg-scrub-bar-buffering-time {\n            position: absolute;\n            top: calc(50% - 3px);\n        }\n\n        vg-controls vg-scrub-bar-buffering-time .background {\n            -webkit-border-radius: 2px;\n            -moz-border-radius: 2px;\n            border-radius: 2px;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgScrubBarBufferingTime.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgScrubBarBufferingTime.propDecorators = {
        "vgFor": [{ type: core_1.Input },],
    };
    return VgScrubBarBufferingTime;
}());
exports.VgScrubBarBufferingTime = VgScrubBarBufferingTime;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1HO0FBQ25HLHdEQUFzRDs7SUF3Q2xELGlDQUFZLEdBQWUsRUFBUyxHQUFVO1FBQVYsUUFBRyxHQUFILEdBQUcsQ0FBTzs2QkFGZCxFQUFFO1FBRzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztLQUNqQztJQUVELDBDQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO1NBQzVGO0tBQ0o7SUFFRCwrQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkQ7SUFFRCwrQ0FBYSxHQUFiO1FBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXRCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsVUFBVSxHQUFHLElBQUksQ0FBQzthQUNyQjtZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUNoRjtTQUNKO1FBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUNyQjtJQUVELDZDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztLQUNwRDs7Z0JBdkVKLGdCQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxvRUFBZ0U7b0JBQzFFLE1BQU0sRUFBRSxDQUFFLHVvQkF1QlQsQ0FBRTtpQkFDTjs7OztnQkFoQzBCLGlCQUFVO2dCQUM1QixjQUFLOzs7MEJBaUNULFlBQUs7O2tDQWxDVjs7QUFpQ2EsMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1zY3J1Yi1iYXItYnVmZmVyaW5nLXRpbWUnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiIFtzdHlsZS53aWR0aF09XCJnZXRCdWZmZXJUaW1lKClcIj48L2Rpdj5gLFxuICAgIHN0eWxlczogWyBgXG4gICAgICAgIHZnLXNjcnViLWJhci1idWZmZXJpbmctdGltZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDVweDtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lIC5iYWNrZ3JvdW5kIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLWNvbnRyb2xzIHZnLXNjcnViLWJhci1idWZmZXJpbmctdGltZSB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IGNhbGMoNTAlIC0gM3B4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLWNvbnRyb2xzIHZnLXNjcnViLWJhci1idWZmZXJpbmctdGltZSAuYmFja2dyb3VuZCB7XG4gICAgICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgIC1tb3otYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICB9XG4gICAgYCBdXG59KVxuZXhwb3J0IGNsYXNzIFZnU2NydWJCYXJCdWZmZXJpbmdUaW1lIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHZnRm9yOiBzdHJpbmc7XG5cbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICB0YXJnZXQ6IGFueTtcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6IFZnQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgfVxuXG4gICAgZ2V0QnVmZmVyVGltZSgpIHtcbiAgICAgICAgbGV0IGJ1ZmZlclRpbWUgPSBcIjAlXCI7XG5cbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0LmJ1ZmZlciAmJiB0aGlzLnRhcmdldC5idWZmZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC50aW1lLnRvdGFsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyVGltZSA9ICcwJSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWZmZXJUaW1lID0gKCh0aGlzLnRhcmdldC5idWZmZXIuZW5kIC8gdGhpcy50YXJnZXQudGltZS50b3RhbCkgKiAxMDApICsgJyUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJ1ZmZlclRpbWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG59XG4iXX0=

/***/ }),

/***/ 916:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var VgScrubBarCuePoints = (function () {
    function VgScrubBarCuePoints(ref, API) {
        this.API = API;
        this.onLoadedMetadataCalled = false;
        this.cuePoints = [];
        this.subscriptions = [];
        this.totalCues = 0;
        this.elem = ref.nativeElement;
    }
    VgScrubBarCuePoints.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgScrubBarCuePoints.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        var onTimeUpdate = this.target.subscriptions.loadedMetadata;
        this.subscriptions.push(onTimeUpdate.subscribe(this.onLoadedMetadata.bind(this)));
        if (this.onLoadedMetadataCalled) {
            this.onLoadedMetadata();
        }
    };
    VgScrubBarCuePoints.prototype.onLoadedMetadata = function () {
        if (this.vgCuePoints) {
            // We need to transform the TextTrackCueList to Array or it doesn't work on IE11/Edge.
            // See: https://github.com/videogular/videogular2/issues/369
            this.cuePoints = [];
            for (var i = 0, l = this.vgCuePoints.length; i < l; i++) {
                var end = (this.vgCuePoints[i].endTime >= 0) ? this.vgCuePoints[i].endTime : this.vgCuePoints[i].startTime + 1;
                var cuePointDuration = (end - this.vgCuePoints[i].startTime) * 1000;
                var position = '0';
                var percentWidth = '0';
                if (typeof cuePointDuration === 'number' && this.target.time.total) {
                    percentWidth = ((cuePointDuration * 100) / this.target.time.total) + "%";
                    position = (this.vgCuePoints[i].startTime * 100 / (Math.round(this.target.time.total / 1000))) + "%";
                }
                this.vgCuePoints[i].$$style = {
                    width: percentWidth,
                    left: position
                };
                this.cuePoints.push(this.vgCuePoints[i]);
            }
        }
    };
    VgScrubBarCuePoints.prototype.updateCuePoints = function () {
        if (!this.target) {
            this.onLoadedMetadataCalled = true;
            return;
        }
        this.onLoadedMetadata();
    };
    VgScrubBarCuePoints.prototype.ngOnChanges = function (changes) {
        if (changes['vgCuePoints'].currentValue) {
            this.updateCuePoints();
        }
    };
    VgScrubBarCuePoints.prototype.ngDoCheck = function () {
        if (this.vgCuePoints) {
            var changes = this.totalCues !== this.vgCuePoints.length;
            if (changes) {
                this.totalCues = this.vgCuePoints.length;
                this.updateCuePoints();
            }
        }
    };
    VgScrubBarCuePoints.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgScrubBarCuePoints.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-scrub-bar-cue-points',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <div class=\"cue-point-container\">\n            <span *ngFor=\"let cp of cuePoints\" [style.width]=\"cp.$$style?.width\" [style.left]=\"cp.$$style?.left\"\n                  class=\"cue-point\"></span>\n        </div>\n    ",
                    styles: ["\n        vg-scrub-bar-cue-points {\n            display: flex;\n            width: 100%;\n            height: 5px;\n            pointer-events: none;\n            position: absolute;\n        }\n\n        vg-scrub-bar-cue-points .cue-point-container .cue-point {\n            position: absolute;\n            height: 5px;\n            background-color: rgba(255, 204, 0, 0.7);\n        }\n\n        vg-controls vg-scrub-bar-cue-points {\n            position: absolute;\n            top: calc(50% - 3px);\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgScrubBarCuePoints.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgScrubBarCuePoints.propDecorators = {
        "vgCuePoints": [{ type: core_1.Input },],
        "vgFor": [{ type: core_1.Input },],
    };
    return VgScrubBarCuePoints;
}());
exports.VgScrubBarCuePoints = VgScrubBarCuePoints;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWN1ZS1wb2ludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1zY3J1Yi1iYXItY3VlLXBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQVN1QjtBQUN2Qix3REFBc0Q7O0lBOENsRCw2QkFBWSxHQUFlLEVBQVMsR0FBVTtRQUFWLFFBQUcsR0FBSCxHQUFHLENBQU87c0NBUFosS0FBSzt5QkFDZixFQUFFOzZCQUVNLEVBQUU7eUJBRXRCLENBQUM7UUFHVCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7S0FDakM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQztTQUM1RjtLQUNKO0lBRUQsMkNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFB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QUM7YUFDMUI7U0FDSjtLQUNKO0lBRUQseUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0tBQ3BEOztnQkF6SEosZ0JBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLDRPQUtUO29CQUNELE1BQU0sRUFBRSxDQUFFLDRnQkFtQlQsQ0FBRTtpQkFDTjs7OztnQkF4Q0csaUJBQVU7Z0JBUUwsY0FBSzs7O2dDQWtDVCxZQUFLOzBCQUNMLFlBQUs7OzhCQTdDVjs7QUEyQ2Esa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBTaW1wbGVDaGFuZ2UsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1zY3J1Yi1iYXItY3VlLXBvaW50cycsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3VlLXBvaW50LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGNwIG9mIGN1ZVBvaW50c1wiIFtzdHlsZS53aWR0aF09XCJjcC4kJHN0eWxlPy53aWR0aFwiIFtzdHlsZS5sZWZ0XT1cImNwLiQkc3R5bGU/LmxlZnRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjdWUtcG9pbnRcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctc2NydWItYmFyLWN1ZS1wb2ludHMge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1cHg7XG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLXNjcnViLWJhci1jdWUtcG9pbnRzIC5jdWUtcG9pbnQtY29udGFpbmVyIC5jdWUtcG9pbnQge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1cHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjA0LCAwLCAwLjcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctY29udHJvbHMgdmctc2NydWItYmFyLWN1ZS1wb2ludHMge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiBjYWxjKDUwJSAtIDNweCk7XG4gICAgICAgIH1cbiAgICBgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdTY3J1YkJhckN1ZVBvaW50cyBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHZnQ3VlUG9pbnRzOiBUZXh0VHJhY2tDdWVMaXN0O1xuICAgIEBJbnB1dCgpIHZnRm9yOiBzdHJpbmc7XG5cbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICB0YXJnZXQ6IGFueTtcbiAgICBvbkxvYWRlZE1ldGFkYXRhQ2FsbGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgY3VlUG9pbnRzOiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgdG90YWxDdWVzID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgcHVibGljIEFQSTogVmdBUEkpIHtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLkFQSS5pc1BsYXllclJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLm9uUGxheWVyUmVhZHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuQVBJLnBsYXllclJlYWR5RXZlbnQuc3Vic2NyaWJlKCgpID0+IHRoaXMub25QbGF5ZXJSZWFkeSgpKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcblxuICAgICAgICBsZXQgb25UaW1lVXBkYXRlID0gdGhpcy50YXJnZXQuc3Vic2NyaXB0aW9ucy5sb2FkZWRNZXRhZGF0YTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gob25UaW1lVXBkYXRlLnN1YnNjcmliZSh0aGlzLm9uTG9hZGVkTWV0YWRhdGEuYmluZCh0aGlzKSkpO1xuXG4gICAgICAgIGlmICh0aGlzLm9uTG9hZGVkTWV0YWRhdGFDYWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Mb2FkZWRNZXRhZGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkZWRNZXRhZGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMudmdDdWVQb2ludHMpIHtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gdHJhbnNmb3JtIHRoZSBUZXh0VHJhY2tDdWVMaXN0IHRvIEFycmF5IG9yIGl0IGRvZXNuJ3Qgd29yayBvbiBJRTExL0VkZ2UuXG4gICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92aWRlb2d1bGFyL3ZpZGVvZ3VsYXIyL2lzc3Vlcy8zNjlcbiAgICAgICAgICAgIHRoaXMuY3VlUG9pbnRzID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy52Z0N1ZVBvaW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZW5kID0gKHRoaXMudmdDdWVQb2ludHNbIGkgXS5lbmRUaW1lID49IDApID8gdGhpcy52Z0N1ZVBvaW50c1sgaSBdLmVuZFRpbWUgOiB0aGlzLnZnQ3VlUG9pbnRzWyBpIF0uc3RhcnRUaW1lICsgMTtcbiAgICAgICAgICAgICAgICBsZXQgY3VlUG9pbnREdXJhdGlvbiA9IChlbmQgLSB0aGlzLnZnQ3VlUG9pbnRzWyBpIF0uc3RhcnRUaW1lKSAqIDEwMDA7XG4gICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gJzAnO1xuICAgICAgICAgICAgICAgIGxldCBwZXJjZW50V2lkdGggPSAnMCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN1ZVBvaW50RHVyYXRpb24gPT09ICdudW1iZXInICYmIHRoaXMudGFyZ2V0LnRpbWUudG90YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudFdpZHRoID0gKChjdWVQb2ludER1cmF0aW9uICogMTAwKSAvIHRoaXMudGFyZ2V0LnRpbWUudG90YWwpICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gKHRoaXMudmdDdWVQb2ludHNbIGkgXS5zdGFydFRpbWUgKiAxMDAgLyAoTWF0aC5yb3VuZCh0aGlzLnRhcmdldC50aW1lLnRvdGFsIC8gMTAwMCkpKSArIFwiJVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICg8YW55PnRoaXMudmdDdWVQb2ludHNbIGkgXSkuJCRzdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHBlcmNlbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcG9zaXRpb25cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdWVQb2ludHMucHVzaCh0aGlzLnZnQ3VlUG9pbnRzWyBpIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VlUG9pbnRzKCkge1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9uTG9hZGVkTWV0YWRhdGFDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Mb2FkZWRNZXRhZGF0YSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSkge1xuICAgICAgICBpZiAoY2hhbmdlc1sgJ3ZnQ3VlUG9pbnRzJyBdLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDdWVQb2ludHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMudmdDdWVQb2ludHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLnRvdGFsQ3VlcyAhPT0gdGhpcy52Z0N1ZVBvaW50cy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1ZXMgPSB0aGlzLnZnQ3VlUG9pbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1ZVBvaW50cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG59XG4iXX0=

/***/ }),

/***/ 917:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var VgScrubBarCurrentTime = (function () {
    function VgScrubBarCurrentTime(ref, API) {
        this.API = API;
        this.vgSlider = false;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    VgScrubBarCurrentTime.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgScrubBarCurrentTime.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBarCurrentTime.prototype.getPercentage = function () {
        return this.target ? ((this.target.time.current * 100) / this.target.time.total) + '%' : '0%';
    };
    VgScrubBarCurrentTime.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgScrubBarCurrentTime.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-scrub-bar-current-time',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "<div class=\"background\" [style.width]=\"getPercentage()\"></div><span class=\"slider\" *ngIf=\"vgSlider\"></span>",
                    styles: ["\n        vg-scrub-bar-current-time {\n            display: flex;\n            width: 100%;\n            height: 5px;\n            pointer-events: none;\n            position: absolute;\n        }\n\n        vg-scrub-bar-current-time .background {\n            background-color: white;\n        }\n\n        vg-controls vg-scrub-bar-current-time {\n            position: absolute;\n            top: calc(50% - 3px);\n            -webkit-border-radius: 2px;\n            -moz-border-radius: 2px;\n            border-radius: 2px;\n        }\n\n        vg-controls vg-scrub-bar-current-time .background {\n            border: 1px solid white;\n            -webkit-border-radius: 2px;\n            -moz-border-radius: 2px;\n            border-radius: 2px;\n        }\n        \n        vg-scrub-bar-current-time .slider{\n            background: white;\n            height: 15px;\n            width: 15px;\n            border-radius: 50%;\n            box-shadow: 0px 0px 10px black;\n            margin-top: -5px;\n            margin-left: -10px;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgScrubBarCurrentTime.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgScrubBarCurrentTime.propDecorators = {
        "vgFor": [{ type: core_1.Input },],
        "vgSlider": [{ type: core_1.Input },],
    };
    return VgScrubBarCurrentTime;
}());
exports.VgScrubBarCurrentTime = VgScrubBarCurrentTime;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWN1cnJlbnQtdGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZnLXNjcnViLWJhci1jdXJyZW50LXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUc7QUFDbkcsd0RBQXNEOztJQXVEbEQsK0JBQVksR0FBZSxFQUFTLEdBQVU7UUFBVixRQUFHLEdBQUgsR0FBRyxDQUFPO3dCQVBqQixLQUFLOzZCQUtGLEVBQUU7UUFHOUIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0tBQ2pDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7U0FDNUY7S0FDSjtJQUVELDZDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuRDtJQUVELDZDQUFhLEdBQWI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7S0FDakc7SUFFRCwyQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7S0FDcEQ7O2dCQTNFSixnQkFBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUscUhBQTZHO29CQUN2SCxNQUFNLEVBQUUsQ0FBRSxzaUNBcUNULENBQUU7aUJBQ047Ozs7Z0JBOUMwQixpQkFBVTtnQkFDNUIsY0FBSzs7OzBCQStDVCxZQUFLOzZCQUNMLFlBQUs7O2dDQWpEVjs7QUErQ2Esc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1zY3J1Yi1iYXItY3VycmVudC10aW1lJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJhY2tncm91bmRcIiBbc3R5bGUud2lkdGhdPVwiZ2V0UGVyY2VudGFnZSgpXCI+PC9kaXY+PHNwYW4gY2xhc3M9XCJzbGlkZXJcIiAqbmdJZj1cInZnU2xpZGVyXCI+PC9zcGFuPmAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctc2NydWItYmFyLWN1cnJlbnQtdGltZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDVweDtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctc2NydWItYmFyLWN1cnJlbnQtdGltZSAuYmFja2dyb3VuZCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLWNvbnRyb2xzIHZnLXNjcnViLWJhci1jdXJyZW50LXRpbWUge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiBjYWxjKDUwJSAtIDNweCk7XG4gICAgICAgICAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgIC1tb3otYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICB9XG5cbiAgICAgICAgdmctY29udHJvbHMgdmctc2NydWItYmFyLWN1cnJlbnQtdGltZSAuYmFja2dyb3VuZCB7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcbiAgICAgICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgLW1vei1ib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZnLXNjcnViLWJhci1jdXJyZW50LXRpbWUgLnNsaWRlcntcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxNXB4O1xuICAgICAgICAgICAgd2lkdGg6IDE1cHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICBib3gtc2hhZG93OiAwcHggMHB4IDEwcHggYmxhY2s7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtNXB4O1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IC0xMHB4O1xuICAgICAgICB9XG4gICAgYCBdXG59KVxuZXhwb3J0IGNsYXNzIFZnU2NydWJCYXJDdXJyZW50VGltZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSB2Z0Zvcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHZnU2xpZGVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICB0YXJnZXQ6IGFueTtcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6IFZnQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgfVxuXG4gICAgZ2V0UGVyY2VudGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0ID8gKCh0aGlzLnRhcmdldC50aW1lLmN1cnJlbnQgKiAxMDApIC8gdGhpcy50YXJnZXQudGltZS50b3RhbCkgKyAnJScgOiAnMCUnO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19

/***/ }),

/***/ 918:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
// Workaround until we can use UTC with Angular Date Pipe
var VgUtcPipe = (function () {
    function VgUtcPipe() {
    }
    VgUtcPipe.prototype.transform = function (value, format) {
        var date = new Date(value);
        var result = format;
        var ss = date.getUTCSeconds();
        var mm = date.getUTCMinutes();
        var hh = date.getUTCHours();
        if (ss < 10) {
            ss = '0' + ss;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        result = result.replace(/ss/g, ss);
        result = result.replace(/mm/g, mm);
        result = result.replace(/hh/g, hh);
        return result;
    };
    VgUtcPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'vgUtc' },] },
    ];
    /** @nocollapse */
    VgUtcPipe.ctorParameters = function () { return []; };
    return VgUtcPipe;
}());
exports.VgUtcPipe = VgUtcPipe;
var VgTimeDisplay = (function () {
    function VgTimeDisplay(ref, API) {
        this.API = API;
        this.vgProperty = 'current';
        this.vgFormat = 'mm:ss';
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    VgTimeDisplay.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgTimeDisplay.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgTimeDisplay.prototype.getTime = function () {
        var t = 0;
        if (this.target) {
            t = Math.round(this.target.time[this.vgProperty]);
            t = isNaN(t) || this.target.isLive ? 0 : t;
        }
        return t;
    };
    VgTimeDisplay.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgTimeDisplay.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-time-display',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <span *ngIf=\"target?.isLive\">LIVE</span>\n        <span *ngIf=\"!target?.isLive\">{{ getTime() | vgUtc:vgFormat }}</span>\n        <ng-content></ng-content>\n    ",
                    styles: ["\n        vg-time-display {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 60px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n            pointer-events: none;\n            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgTimeDisplay.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgTimeDisplay.propDecorators = {
        "vgFor": [{ type: core_1.Input },],
        "vgProperty": [{ type: core_1.Input },],
        "vgFormat": [{ type: core_1.Input },],
    };
    return VgTimeDisplay;
}());
exports.VgTimeDisplay = VgTimeDisplay;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdGltZS1kaXNwbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmctdGltZS1kaXNwbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdIO0FBQ3hILHFEQUFtRDs7Ozs7SUFNL0MsNkJBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxNQUFjO1FBQ25DLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBa0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdDLElBQUksRUFBRSxHQUFrQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0MsSUFBSSxFQUFFLEdBQWtCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUzQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNWLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDVixFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNqQjtRQUNELEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1YsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDakI7UUFFRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQVUsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBVSxFQUFFLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQUMsTUFBTSxDQUFDO0tBQ2pCOztnQkF4QkosV0FBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTs7OztvQkFMdkI7O0FBTWEsOEJBQVM7O0lBK0RsQix1QkFBWSxHQUFlLEVBQVMsR0FBVTtRQUFWLFFBQUcsR0FBSCxHQUFHLENBQU87MEJBUmhCLFNBQVM7d0JBQ1gsT0FBTzs2QkFLSCxFQUFFO1FBRzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztLQUNqQztJQUVELGdDQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO1NBQzVGO0tBQ0o7SUFFRCxxQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkQ7SUFFRCwrQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFFLENBQUMsQ0FBQztZQUNwRCxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ1o7SUFFRCxtQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7S0FDcEQ7O2dCQW5FSixnQkFBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsZ0xBSVQ7b0JBQ0QsTUFBTSxFQUFFLENBQUUsb2lCQWlCVCxDQUFFO2lCQUNOOzs7O2dCQTFEMEIsaUJBQVU7Z0JBQzVCLGNBQUs7OzswQkEyRFQsWUFBSzsrQkFDTCxZQUFLOzZCQUNMLFlBQUs7O3dCQTlEVjs7QUEyRGEsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBPbkluaXQsIFBpcGVUcmFuc2Zvcm0sIFBpcGUsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG4vLyBXb3JrYXJvdW5kIHVudGlsIHdlIGNhbiB1c2UgVVRDIHdpdGggQW5ndWxhciBEYXRlIFBpcGVcbkBQaXBlKHsgbmFtZTogJ3ZnVXRjJyB9KVxuZXhwb3J0IGNsYXNzIFZnVXRjUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gZm9ybWF0O1xuICAgICAgICBsZXQgc3M6IHN0cmluZ3xudW1iZXIgPSBkYXRlLmdldFVUQ1NlY29uZHMoKTtcbiAgICAgICAgbGV0IG1tOiBzdHJpbmd8bnVtYmVyID0gZGF0ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgICAgIGxldCBoaDogc3RyaW5nfG51bWJlciA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcblxuICAgICAgICBpZiAoc3MgPCAxMCkge1xuICAgICAgICAgICAgc3MgPSAnMCcgKyBzcztcbiAgICAgICAgfVxuICAgICAgICBpZiAobW0gPCAxMCkge1xuICAgICAgICAgICAgbW0gPSAnMCcgKyBtbTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGggPCAxMCkge1xuICAgICAgICAgICAgaGggPSAnMCcgKyBoaDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9zcy9nLCA8c3RyaW5nPnNzKTtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL21tL2csIDxzdHJpbmc+bW0pO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvaGgvZywgPHN0cmluZz5oaCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmctdGltZS1kaXNwbGF5JyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuICpuZ0lmPVwidGFyZ2V0Py5pc0xpdmVcIj5MSVZFPC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiF0YXJnZXQ/LmlzTGl2ZVwiPnt7IGdldFRpbWUoKSB8IHZnVXRjOnZnRm9ybWF0IH19PC9zcGFuPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgYCxcbiAgICBzdHlsZXM6IFsgYFxuICAgICAgICB2Zy10aW1lLWRpc3BsYXkge1xuICAgICAgICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHdpZHRoOiA2MHB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EgTmV1ZSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgICAgICAgfVxuICAgIGAgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ1RpbWVEaXNwbGF5IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHZnRm9yOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdmdQcm9wZXJ0eTogc3RyaW5nID0gJ2N1cnJlbnQnO1xuICAgIEBJbnB1dCgpIHZnRm9ybWF0OiBzdHJpbmcgPSAnbW06c3MnO1xuXG4gICAgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocmVmOiBFbGVtZW50UmVmLCBwdWJsaWMgQVBJOiBWZ0FQSSkge1xuICAgICAgICB0aGlzLmVsZW0gPSByZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuQVBJLmlzUGxheWVyUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuICAgIH1cblxuICAgIGdldFRpbWUoKSB7XG4gICAgICAgIGxldCB0ID0gMDtcblxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHQgPSBNYXRoLnJvdW5kKHRoaXMudGFyZ2V0LnRpbWVbIHRoaXMudmdQcm9wZXJ0eSBdKTtcbiAgICAgICAgICAgIHQgPSBpc05hTih0KSB8fCB0aGlzLnRhcmdldC5pc0xpdmUgPyAwIDogdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19

/***/ }),

/***/ 919:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var vg_api_1 = __webpack_require__(28);
var VgTrackSelector = (function () {
    function VgTrackSelector(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    VgTrackSelector.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgTrackSelector.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        var subs = Array.from(this.API.getMasterMedia().elem.children)
            .filter(function (item) { return item.tagName === 'TRACK'; })
            .filter(function (item) { return item.kind === 'subtitles'; })
            .map(function (item) {
            return ({
                label: item.label,
                selected: item.default === true,
                id: item.srclang
            });
        });
        this.tracks = subs.concat([
            {
                id: null,
                label: 'Off',
                selected: subs.every(function (item) { return item.selected === false; })
            }
        ]);
        var track = this.tracks.filter(function (item) { return item.selected === true; })[0];
        this.trackSelected = track.id;
        this.ariaValue = track.label;
    };
    VgTrackSelector.prototype.selectTrack = function (trackId) {
        var _this = this;
        this.trackSelected = (trackId === 'null') ? null : trackId;
        this.ariaValue = 'No track selected';
        Array.from(this.API.getMasterMedia().elem.textTracks)
            .forEach(function (item) {
            if (item.language === trackId) {
                _this.ariaValue = item.label;
                item.mode = 'showing';
            }
            else {
                item.mode = 'hidden';
            }
        });
    };
    VgTrackSelector.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    VgTrackSelector.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vg-track-selector',
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <div class=\"container\">\n            <div class=\"track-selected\"\n                 [class.vg-icon-closed_caption]=\"!trackSelected\">\n                {{ trackSelected || '' }}\n            </div>\n            \n            <select class=\"trackSelector\" \n                    (change)=\"selectTrack($event.target.value)\"\n                    tabindex=\"0\"\n                    aria-label=\"track selector\"\n                    [attr.aria-valuetext]=\"ariaValue\">\n                <option \n                    *ngFor=\"let track of tracks\"\n                    [value]=\"track.id\"\n                    [selected]=\"track.selected === true\">\n                    {{ track.label }}\n                </option>\n            </select>\n        </div>\n    ",
                    styles: ["\n        vg-track-selector {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            width: 50px;\n            height: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n        vg-track-selector .container {\n            position: relative;\n            display: flex;\n            flex-grow: 1;\n            align-items: center;\n            \n            padding: 0;\n            margin: 5px;\n        }\n        vg-track-selector select.trackSelector {\n            width: 50px;\n            padding: 5px 8px;\n            border: none;\n            background: none;\n            -webkit-appearance: none;\n            -moz-appearance: none;\n            appearance: none;\n            color: transparent;\n            font-size: 16px;\n        }\n        vg-track-selector .track-selected {\n            position: absolute;\n            width: 100%;\n            height: 50px;\n            top: -6px;\n            text-align: center;\n            text-transform: uppercase;\n            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n            padding-top: 2px;\n            pointer-events: none;\n        }\n        vg-track-selector .vg-icon-closed_caption:before {\n            width: 100%;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    VgTrackSelector.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: vg_api_1.VgAPI, },
    ]; };
    VgTrackSelector.propDecorators = {
        "vgFor": [{ type: core_1.Input },],
    };
    return VgTrackSelector;
}());
exports.VgTrackSelector = VgTrackSelector;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdHJhY2stc2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy10cmFjay1zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRztBQUNuRyxxREFBbUQ7O0lBZ0cvQyx5QkFBWSxHQUFlLEVBQVMsR0FBVTtRQUFWLFFBQUcsR0FBSCxHQUFHLENBQU87NkJBSmQsRUFBRTtRQUs5QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7S0FDakM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQztTQUM1RjtLQUNKO0lBRUQsdUNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQU0sSUFBSSxHQUFrQixLQUFLLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBeUIsQ0FBQyxRQUFRLENBQUM7YUFDaEcsTUFBTSxDQUFDLFVBQUMsSUFBaUIsSUFBSyxPQUFBLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUF4QixDQUF3QixDQUFDO2FBQ3ZELE1BQU0sQ0FBQyxVQUFDLElBQXNCLElBQUssT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBekIsQ0FBeUIsQ0FBQzthQUM3RCxHQUFHLENBQUMsVUFBQyxJQUFzQjtZQUFLLE9BQUEsQ0FBQztnQkFDOUIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJO2dCQUMvQixFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDbkIsQ0FBQztRQUorQixDQUkvQixDQUFDLENBQUM7UUFFUixJQUFJLENBQUMsTUFBTSxHQUNKLElBQUk7WUFDUDtnQkFDSSxFQUFFLEVBQUUsSUFBSTtnQkFDUixLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQVksSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUF2QixDQUF1QixDQUFDO2FBQ2xFO1VBQ0osQ0FBQztRQUVGLElBQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBWSxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQXRCLENBQXNCLENBQUMsQ0FBRSxDQUFDLENBQUUsQ0FBQztRQUN4RixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ2hDO0lBRUQscUNBQVcsR0FBWCxVQUFZLE9BQWU7UUFBM0IsaUJBY0M7UUFiRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7UUFFM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztRQUVyQyxLQUFLLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBeUIsQ0FBQyxVQUFVLENBQUM7YUFDdEUsT0FBTyxDQUFDLFVBQUMsSUFBZTtZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7YUFDekI7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUN4QjtTQUNKLENBQUMsQ0FBQztLQUNWO0lBRUQscUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0tBQ3BEOztnQkFoSkosZ0JBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLHd3QkFvQlQ7b0JBQ0QsTUFBTSxFQUFFLENBQUUsNDlDQWlEVCxDQUFFO2lCQUNOOzs7O2dCQXBGbUIsaUJBQVU7Z0JBQ3JCLGNBQUs7OzswQkFxRlQsWUFBSzs7MEJBdEZWOztBQXFGYSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndmctdHJhY2stc2VsZWN0b3InLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLXNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgW2NsYXNzLnZnLWljb24tY2xvc2VkX2NhcHRpb25dPVwiIXRyYWNrU2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICB7eyB0cmFja1NlbGVjdGVkIHx8ICcnIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInRyYWNrU2VsZWN0b3JcIiBcbiAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJzZWxlY3RUcmFjaygkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJ0cmFjayBzZWxlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWV0ZXh0XT1cImFyaWFWYWx1ZVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0cmFjayBvZiB0cmFja3NcIlxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwidHJhY2suaWRcIlxuICAgICAgICAgICAgICAgICAgICBbc2VsZWN0ZWRdPVwidHJhY2suc2VsZWN0ZWQgPT09IHRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgdHJhY2subGFiZWwgfX1cbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogWyBgXG4gICAgICAgIHZnLXRyYWNrLXNlbGVjdG9yIHtcbiAgICAgICAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA1MHB4O1xuICAgICAgICB9XG4gICAgICAgIHZnLXRyYWNrLXNlbGVjdG9yIC5jb250YWluZXIge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICBtYXJnaW46IDVweDtcbiAgICAgICAgfVxuICAgICAgICB2Zy10cmFjay1zZWxlY3RvciBzZWxlY3QudHJhY2tTZWxlY3RvciB7XG4gICAgICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDVweCA4cHg7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAgICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICAgIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgfVxuICAgICAgICB2Zy10cmFjay1zZWxlY3RvciAudHJhY2stc2VsZWN0ZWQge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB0b3A6IC02cHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IEhlbHZldGljYSBOZXVlLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDJweDtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB9XG4gICAgICAgIHZnLXRyYWNrLXNlbGVjdG9yIC52Zy1pY29uLWNsb3NlZF9jYXB0aW9uOmJlZm9yZSB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgIGAgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ1RyYWNrU2VsZWN0b3IgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgdmdGb3I6IHN0cmluZztcblxuICAgIGVsZW06IEhUTUxFbGVtZW50O1xuICAgIHRhcmdldDogYW55O1xuICAgIHRyYWNrczogQXJyYXk8T3B0aW9uPjtcbiAgICB0cmFja1NlbGVjdGVkOiBzdHJpbmc7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgYXJpYVZhbHVlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IEVsZW1lbnRSZWYsIHB1YmxpYyBBUEk6IFZnQVBJKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG5cbiAgICAgICAgY29uc3Qgc3ViczogQXJyYXk8T3B0aW9uPiA9IEFycmF5LmZyb20oKHRoaXMuQVBJLmdldE1hc3Rlck1lZGlhKCkuZWxlbSBhcyBIVE1MTWVkaWFFbGVtZW50KS5jaGlsZHJlbilcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW06IEhUTUxFbGVtZW50KSA9PiBpdGVtLnRhZ05hbWUgPT09ICdUUkFDSycpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtOiBIVE1MVHJhY2tFbGVtZW50KSA9PiBpdGVtLmtpbmQgPT09ICdzdWJ0aXRsZXMnKVxuICAgICAgICAgICAgLm1hcCgoaXRlbTogSFRNTFRyYWNrRWxlbWVudCkgPT4gKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogaXRlbS5sYWJlbCxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogaXRlbS5kZWZhdWx0ID09PSB0cnVlLFxuICAgICAgICAgICAgICAgIGlkOiBpdGVtLnNyY2xhbmdcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLnRyYWNrcyA9IFtcbiAgICAgICAgICAgIC4uLnN1YnMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdPZmYnLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzdWJzLmV2ZXJ5KChpdGVtOiBPcHRpb24pID0+IGl0ZW0uc2VsZWN0ZWQgPT09IGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IHRyYWNrOiBPcHRpb24gPSB0aGlzLnRyYWNrcy5maWx0ZXIoKGl0ZW06IE9wdGlvbikgPT4gaXRlbS5zZWxlY3RlZCA9PT0gdHJ1ZSlbIDAgXTtcbiAgICAgICAgdGhpcy50cmFja1NlbGVjdGVkID0gdHJhY2suaWQ7XG4gICAgICAgIHRoaXMuYXJpYVZhbHVlID0gdHJhY2subGFiZWw7XG4gICAgfVxuXG4gICAgc2VsZWN0VHJhY2sodHJhY2tJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudHJhY2tTZWxlY3RlZCA9ICh0cmFja0lkID09PSAnbnVsbCcpID8gbnVsbCA6IHRyYWNrSWQ7XG5cbiAgICAgICAgdGhpcy5hcmlhVmFsdWUgPSAnTm8gdHJhY2sgc2VsZWN0ZWQnO1xuXG4gICAgICAgIEFycmF5LmZyb20oKHRoaXMuQVBJLmdldE1hc3Rlck1lZGlhKCkuZWxlbSBhcyBIVE1MTWVkaWFFbGVtZW50KS50ZXh0VHJhY2tzKVxuICAgICAgICAgICAgLmZvckVhY2goKGl0ZW06IFRleHRUcmFjaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxhbmd1YWdlID09PSB0cmFja0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJpYVZhbHVlID0gaXRlbS5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5tb2RlID0gJ3Nob3dpbmcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubW9kZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19

/***/ }),

/***/ 920:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(73);
var home_1 = __webpack_require__(373);
var comand_1 = __webpack_require__(375);
var current_tournaments_1 = __webpack_require__(376);
var new_tournaments_1 = __webpack_require__(377);
var past_tournaments_1 = __webpack_require__(380);
var cabinet_1 = __webpack_require__(381);
var news_1 = __webpack_require__(384);
var photo_1 = __webpack_require__(385);
var login_1 = __webpack_require__(386);
var news_2 = __webpack_require__(389);
var add_news_1 = __webpack_require__(390);
var turnament_1 = __webpack_require__(393);
var tuning_turnament_1 = __webpack_require__(394);
var adminRoutes = [
    { path: common_1.Common.RoutePaths.News, component: news_2.NewsAdmin },
    { path: common_1.Common.RoutePaths.EditNews, component: add_news_1.AddNews },
    { path: common_1.Common.RoutePaths.Turnament, component: turnament_1.Turnament },
    { path: common_1.Common.RoutePaths.TuningTurnament, component: tuning_turnament_1.TuningTurnament },
];
exports.AppRoutes = [
    { path: common_1.Common.RoutePaths.Home, component: home_1.Home },
    { path: common_1.Common.RoutePaths.Comand, component: comand_1.Comand },
    { path: common_1.Common.RoutePaths.CurrentTournaments, component: current_tournaments_1.CurrentTournaments },
    { path: common_1.Common.RoutePaths.NewTournaments, component: new_tournaments_1.NewTournaments },
    { path: common_1.Common.RoutePaths.PastTournaments, component: past_tournaments_1.PastTournaments },
    { path: common_1.Common.RoutePaths.Cabinet, component: cabinet_1.Cabinet },
    { path: common_1.Common.RoutePaths.News, component: news_1.News },
    { path: common_1.Common.RoutePaths.Photo, component: photo_1.Photo },
    { path: common_1.Common.RoutePaths.Video, component: login_1.Login },
    { path: common_1.Common.RoutePaths.Admin, component: login_1.Login },
    { path: common_1.Common.RoutePaths.Admin, component: login_1.Login, children: adminRoutes },
    { path: common_1.Common.RoutePaths.Any, component: home_1.Home }
];


/***/ }),

/***/ 921:
/***/ (function(module, exports) {

module.exports = "<div class=\"home-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n    <div class=\"about-portal\">\r\n        <div class=\"slade-content\">\r\n            <ul id=\"slides\">\r\n                <li class=\"slide showing\"></li>\r\n                <li class=\"slide\"></li>\r\n                <li class=\"slide\"></li>\r\n                <li class=\"slide\"></li>\r\n                <li class=\"slide\"></li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"info-portal\">\r\n            <h5>\"Спортивное общество \"Олимп\"</h5>\r\n            <p>\r\n                Является основанным на членстве Саратовским региональным общественным объединением, созданным с целью развития, пропаганды и популяризации спорта, физической культуры в Саратове и Саратовской области. Деятельность Организации основывается на принципах добровольности, равноправия его членов, самоуправления, законности и гласности.\r\n            </p>\r\n            Основные задачи общества:\r\n            <hr>\r\n            <ul class=\"list-1 indent-left6 p5-1\">\r\n                <li>Организация и проведение спортивно-массовых мероприятий</li>\r\n                <li>Привлечение населения к занятиям спортом и физической культурой</li>\r\n            </ul>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"new-news\" *ngIf=\"isNews\">\r\n        Последние новости\r\n    </div>\r\n    <div class=\"news-home\">\r\n        <div *ngFor=\"let news of newss; let i = index\" class=\"news-block\">\r\n            <div class=\"news-content\">\r\n                <div *ngIf=\"news.type == 1\" class=\"news-text-block\">\r\n                    <div class=\"news-title\">\r\n                        {{news.title}}\r\n                        <div class=\"news-date\">\r\n                            {{news.date}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"text-news-content\">\r\n                       \r\n                        <div class=\"news-text\">\r\n                            <div class=\"news-photo\" [style.background-image]='news.photo[0].url'></div>\r\n                            {{news.text}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf=\"news.type == 2\" class=\"news-photo-block\">\r\n                    <div id=\"photo-content\" class=\"photo-news-content\">\r\n                        <div class=\"news-title\">\r\n                            {{news.title}}\r\n                            <div class=\"news-date\">\r\n                                {{news.date}}\r\n                            </div>\r\n                        </div>\r\n                        <div id=\"{{'display'+ i}}\" class=\"news-photo-display\" [style.background-image]=\"news.photo[0].url\"></div>\r\n                        <div class=\"photo-button-content\">\r\n                            <div *ngFor=\"let photo of news.photo\" class=\"news-photo-button\" (click)=\"showImg(photo.url, i)\" [style.background-image]=\"photo.url\"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf=\"news.type == 3\" class=\"news-video-block\">\r\n                    <div class=\"video-news-content\">\r\n                        <div class=\"news-title\">\r\n                            {{news.title}}\r\n                            <div class=\"news-date\">\r\n                                {{news.date}}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"news-video\">\r\n                            <vg-player>\r\n                                <vg-controls>\r\n                                    <vg-play-pause></vg-play-pause>\r\n                                    <vg-time-display vgProperty=\"current\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                                    <vg-scrub-bar>\r\n                                        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\r\n                                        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\r\n                                    </vg-scrub-bar>\r\n                                    <vg-time-display vgProperty=\"total\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                                    <vg-mute></vg-mute>\r\n                                    <vg-volume></vg-volume>\r\n                                    <vg-fullscreen></vg-fullscreen>\r\n                                </vg-controls>\r\n                                <video #media [vgMedia]=\"media\" id=\"singleVideo\" preload=\"auto\" crossorigin=\"\">\r\n                                    <source src='{{news.urlVideo}}' type=\"video/mp4\">\r\n                                </video>\r\n                            </vg-player>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 922:
/***/ (function(module, exports) {

module.exports = "<div class=\"command-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n\r\n    <div class=\"command-title\">\r\n        <div class=\"command-title-photo\">\r\n        </div>\r\n        <div class=\"command-title-text\">\r\n            Список команд играющих в лиги\r\n        </div>\r\n    </div>\r\n\r\n\r\n\r\n    <div *ngFor=\"let command of commands; let i = index\" class=\"command-block\">\r\n\r\n        <div class=\"command-avatar-block\">\r\n            <div class=\"command-avatar\" [style.background-image]=\"command.photo\"></div>\r\n        </div>\r\n\r\n        <div class=\"command-name\">{{command.name}}</div>\r\n\r\n        <div class=\"command-player\">\r\n            <div class=\"tournaments-command-title inline-block\">\r\n                Состав\r\n            </div>\r\n\r\n            <input type=\"checkbox\" id=\"{{'tournaments' + i}}\" class=\"hide\" [attr.checked]=\"isChecked ? 'checked' : null\" />\r\n            <label for=\"{{'tournaments' + i}}\" class=\"tournaments-command-open\"></label>\r\n            <div>\r\n                <table class=\"lk-command comand-table\">\r\n                    <tr class=\"lk-player\">\r\n                        <td class=\"lk-number-count title-header\">\r\n                            №\r\n                        </td>\r\n                        <td class=\"lk-surname title-header\">\r\n                            Фамилия\r\n                        </td>\r\n                        <td class=\"lk-full-name title-header\">\r\n                            Имя\r\n                        </td>\r\n                        <td class=\"lk-last-name title-header\">\r\n                            Отчество\r\n                        </td>\r\n                        <td class=\"lk-number title-header\">\r\n                            Номер в поле\r\n                        </td>\r\n                    </tr>\r\n\r\n                    <tr class=\"lk-player\" *ngFor=\"let player of command.players; let j = index\">\r\n                        <td class=\"lk-number-count\">\r\n                            {{j+1}}\r\n                        </td>\r\n                        <td class=\"lk-surname\">\r\n                            {{player.surname}}\r\n                        </td>\r\n                        <td class=\"lk-full-name\">\r\n                            {{player.name}}\r\n                        </td>\r\n                        <td class=\"lk-last-name\">\r\n                            {{player.middleName}}\r\n                        </td>\r\n                        <td class=\"lk-number\">\r\n                            {{player.number}}\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 923:
/***/ (function(module, exports) {

module.exports = "<div class=\"current-tournaments\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n\r\n    <div class=\"current-tournaments-content\">\r\n        <div class=\"tournaments-photo\" [style.background-image]=\"'url(./content/img/slade_home/slade1.jpg)'\"></div>\r\n        <div class=\"title-tournaments\">\r\n            <div class=\"tournaments-text\">\r\n                Чемпионат саратова по минифутболу 2018\r\n            </div>\r\n        </div>\r\n        <div class=\"tournaments-registration-block\">\r\n            <div class=\"tournaments-date\">\r\n                C 12.12.2017\r\n            </div>\r\n            <form class=\"example-form\">\r\n                <button mat-button class=\"tournaments-registration\">Учавствовать</button>\r\n            </form>\r\n        </div>\r\n\r\n\r\n        <div class=\"tournaments-command-content\">\r\n            <div class=\"tournaments-command-title\">\r\n                Команды\r\n            </div>\r\n\r\n            <div class=\"tournaments-command\">\r\n                <div class=\"tournaments-command-number title-header\">\r\n                    №\r\n                </div>\r\n                <div class=\"tournaments-command-name title-header\">\r\n                    Названия команд участников турнира\r\n                </div>\r\n                <div class=\"tournaments-command-status title-header\">\r\n                    Статус заявки\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"tournaments-command\">\r\n                <div class=\"tournaments-command-number\">\r\n                    1\r\n                </div>\r\n                <div class=\"tournaments-command-name\">\r\n                    Зенит\r\n                </div>\r\n                <div class=\"tournaments-command-status\">\r\n                    Заявка подана\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"tournaments-command\">\r\n                <div class=\"tournaments-command-number\">\r\n                    2\r\n                </div>\r\n                <div class=\"tournaments-command-name\">\r\n                    Дрова\r\n                </div>\r\n                <div class=\"tournaments-command-status\">\r\n                    Заявка принята\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"tournaments-command\">\r\n                <div class=\"tournaments-command-number\">\r\n                    3\r\n                </div>\r\n                <div class=\"tournaments-command-name\">\r\n                    Арсенал\r\n                </div>\r\n                <div class=\"tournaments-command-status\">\r\n                    Заявка подана\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"current-tournaments-content\">\r\n        <div class=\"tournaments-photo\" [style.background-image]=\"'url(./content/img/slade_home/slade1.jpg)'\"></div>\r\n        <div class=\"title-tournaments\">\r\n            <div class=\"tournaments-text\">\r\n                Чемпионат саратова по минифутболу 2018\r\n            </div>\r\n        </div>\r\n        <div class=\"tournaments-registration-block\">\r\n            <div class=\"tournaments-date\">\r\n                C 12.12.2017\r\n            </div>\r\n            <form class=\"example-form\">\r\n                <button mat-button class=\"tournaments-registration\">Учавствовать</button>\r\n            </form>\r\n        </div>\r\n\r\n\r\n        <div class=\"tournaments-command-content\">\r\n            <div class=\"tournaments-command-title\">\r\n                Команды\r\n            </div>\r\n\r\n            <div class=\"tournaments-command\">\r\n                <div class=\"tournaments-command-number title-header\">\r\n                    №\r\n                </div>\r\n                <div class=\"tournaments-command-name title-header\">\r\n                    Названия команд участников турнира\r\n                </div>\r\n                <div class=\"tournaments-command-status title-header\">\r\n                    Статус заявки\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"tournaments-command\">\r\n                <div class=\"tournaments-command-number\">\r\n                    1\r\n                </div>\r\n                <div class=\"tournaments-command-name\">\r\n                    Зенит\r\n                </div>\r\n                <div class=\"tournaments-command-status\">\r\n                    Заявка подана\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"tournaments-command\">\r\n                <div class=\"tournaments-command-number\">\r\n                    2\r\n                </div>\r\n                <div class=\"tournaments-command-name\">\r\n                    Дрова\r\n                </div>\r\n                <div class=\"tournaments-command-status\">\r\n                    Заявка принята\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"tournaments-command\">\r\n                <div class=\"tournaments-command-number\">\r\n                    3\r\n                </div>\r\n                <div class=\"tournaments-command-name\">\r\n                    Арсенал\r\n                </div>\r\n                <div class=\"tournaments-command-status\">\r\n                    Заявка подана\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 924:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Command = (function () {
    function Command(photo, name, phone, email, command) {
        this.photo = photo;
        this.name = name;
        this.command = command;
    }
    return Command;
}());
exports.Command = Command;
var CommandFilter = (function () {
    function CommandFilter(name, id) {
        this.name = name;
        this.id = id;
    }
    return CommandFilter;
}());
exports.CommandFilter = CommandFilter;
var CommandsId = (function () {
    function CommandsId(id) {
        this.id = id;
    }
    return CommandsId;
}());
exports.CommandsId = CommandsId;
var CommandForTurnament = (function () {
    function CommandForTurnament(id, name, status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
    return CommandForTurnament;
}());
exports.CommandForTurnament = CommandForTurnament;


/***/ }),

/***/ 925:
/***/ (function(module, exports) {

module.exports = "<div class=\"current-tournaments\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n\r\n    <div class=\"tournaments-not\">\r\n        <div class=\"tournaments-not-photo\">\r\n        </div>\r\n        <div class=\"tournaments-log-text\" *ngIf=\"isTur\">\r\n            Проходит набор команд для участия\r\n        </div>\r\n        <div class=\"tournaments-log-text no-log\" *ngIf=\"!isTur\">\r\n            Нет открытых чемпионатов\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"news-block\" *ngFor=\"let turnament of turnaments; let i = index\">\r\n        <div class=\"current-tournaments-content\">\r\n\r\n            <div class=\"title-tournaments\">\r\n                <div class=\"tournaments-date\">\r\n                    C {{turnament.dateStart}}\r\n                </div>\r\n                <div class=\"tournaments-text\">\r\n                    {{turnament.name}}\r\n                </div>\r\n\r\n                <button mat-button class=\"tournaments-registration button-active\" (click)=\"declareTournament(turnament.id, i)\">Участвовать</button>\r\n            </div>\r\n\r\n            <div class=\"tournaments-description\">\r\n                {{turnament.description}}\r\n            </div>\r\n\r\n            <div class=\"tournaments-command-content\">\r\n                <div class=\"tournaments-command-title inline-block\">\r\n                    Команды\r\n                </div>\r\n\r\n                <div class=\"turnament-price\">\r\n                    Взнос за турнир - {{turnament.contributionTournament}}p.   Взнос за игру - {{turnament.contributionGame}}р.\r\n                </div>\r\n\r\n                <input type=\"checkbox\" id=\"{{'tur'+i}}\" class=\"hide\" [attr.checked]=\"isChecked ? 'checked' : null\" />\r\n                <label for=\"{{'tur'+i}}\" class=\"tournaments-command-open\"></label>\r\n\r\n                <table class=\"lk-command\">\r\n                    <tr>\r\n                        <td class=\"title-header\">\r\n                            №\r\n                        </td>\r\n                        <td class=\"title-header\">\r\n                            Названия команд участвующих в турнире\r\n                        </td>\r\n                        <td class=\"title-header\">\r\n                            Статус заявки\r\n                        </td>\r\n                    </tr>\r\n\r\n                    <tr *ngFor=\"let command of turnament.commands; let j = index\">\r\n                        <td>\r\n                            {{j+1}}\r\n                        </td>\r\n                        <td>\r\n                            {{command.name}}\r\n                        </td>\r\n                        <td *ngIf=\"!command.status\" class=\"filed\">\r\n                            рассмотрение\r\n                        </td>\r\n                        <td *ngIf=\"command.status\" class=\"adopted\">\r\n                            участие\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 926:
/***/ (function(module, exports) {

module.exports = "<div class=\"registration-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n    <div class=\"login-button\" [ngClass]=\"selectPage == 1 ? 'active-button' : 'unactive-button'\" (click)=\"userPage(1)\">Вход</div>\r\n    <div class=\"registration-button\" [ngClass]=\"selectPage == 2 ? 'active-button' : 'unactive-button'\" (click)=\"userPage(2)\">Регистрация</div>\r\n    <div class=\"reestablish-button\" [ngClass]=\"selectPage == 3 ? 'active-button' : 'unactive-button'\" (click)=\"userPage(3)\">Забыли пароль?</div>\r\n\r\n    <div class=\"login-content\" *ngIf=\"selectPage == 1\">\r\n        <form class=\"example-form\">\r\n            <mat-form-field class=\"example-full-width login\">\r\n                <input matInput placeholder=\"Логин\" name=\"login\" [(ngModel)]=\"user.login\">\r\n            </mat-form-field>\r\n\r\n            <mat-form-field class=\"example-full-width passvord\">\r\n                <input type=\"password\" matInput placeholder=\"Пароль\" name=\"password\" [(ngModel)]=\"user.password\">\r\n            </mat-form-field>\r\n\r\n            <button mat-button class=\"button-come-in\" (click)='Authorization()'>Войти</button>\r\n        </form>\r\n    </div>\r\n\r\n    <div class=\"login-content-registration\" *ngIf=\"selectPage == 2\">\r\n        <form class=\"example-form\">\r\n            <mat-form-field class=\"example-full-width login\">\r\n                <input matInput placeholder=\"Введите логин\" value=\"\">\r\n            </mat-form-field>\r\n\r\n            <mat-form-field class=\"example-full-width passvord\">\r\n                <input type=\"password\" matInput placeholder=\"Введите пароль\" value=\"\">\r\n            </mat-form-field>\r\n\r\n            <mat-form-field class=\"example-full-width passvord\">\r\n                <input type=\"password\" matInput placeholder=\"Повторите пароль\" value=\"\">\r\n            </mat-form-field>\r\n\r\n            <button mat-button class=\"button-registration\">Зарегистрировать</button>\r\n        </form>\r\n    </div>\r\n\r\n    <div class=\"login-content-registration\" *ngIf=\"selectPage == 3\">\r\n        <form class=\"example-form\">\r\n            <mat-form-field class=\"example-full-width login\">\r\n                <input matInput placeholder=\"Введите логин\" value=\"\">\r\n            </mat-form-field>\r\n\r\n            <mat-form-field class=\"example-full-width passvord\">\r\n                <input type=\"password\" matInput placeholder=\"Введите новый пароль\" value=\"\">\r\n            </mat-form-field>\r\n\r\n            <mat-form-field class=\"example-full-width passvord\">\r\n                <input type=\"password\" matInput placeholder=\"Повторите новый пароль\" value=\"\">\r\n            </mat-form-field>\r\n\r\n            <button mat-button class=\"button-registration\">Изменить пароль</button>\r\n        </form>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 927:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Account = (function () {
    function Account(photo, name, phone, email, command) {
        this.photo = photo;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.command = command;
    }
    return Account;
}());
exports.Account = Account;
var Player = (function () {
    function Player(playerId, name, surname, middleName, number) {
        this.playerId = playerId;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.number = number;
    }
    return Player;
}());
exports.Player = Player;


/***/ }),

/***/ 928:
/***/ (function(module, exports) {

module.exports = "<div class=\"cabinet-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n    <div class=\"lk-info\">\r\n        <div class=\"lk-avatar-block\">\r\n            <div class=\"lk-avatar\" id=\"avatar\" [style.background-image]=\"account.photo\"></div>\r\n        </div>\r\n\r\n        <div class=\"lk-label\">\r\n            Персональные данные команды\r\n        </div>\r\n\r\n        <div class=\"lk-name\">\r\n            <div>Название команды</div>\r\n            <input placeholder=\"Название команды\" name=\"name\" [(ngModel)]=\"account.name\" [disabled]=\"isEdit\" />\r\n        </div>\r\n        <div class=\"lk-fone\">\r\n            <div>Контактный телефон</div>\r\n            <input placeholder=\"Контактный телефон\" type=\"text\" name=\"phone\" [(ngModel)]=\"account.phone\" [disabled]=\"isEdit\" />\r\n        </div>\r\n        <div class=\"lk-email\">\r\n            <div>Электронная почта</div>\r\n            <input placeholder=\"Электронная почта\" type=\"text\" name=\"email\" [(ngModel)]=\"account.email\" [disabled]=\"isEdit\" />\r\n        </div>\r\n\r\n        <div class=\"lk-button\">\r\n            <div class=\"file-upload\">\r\n                <label>\r\n                    <input type=\"file\" name=\"file\" accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"avatarChanged($event)\" />\r\n                    <span>Загрузить фото</span>\r\n                </label>\r\n            </div>\r\n            <button mat-button class=\"button-lk-add-player\" (click)=\"openFormAddPlayer()\">Добавить игрока</button>\r\n            <button mat-button class=\"button-lk-update\" id=\"editButton\" (click)=\"editAccountInfo(isEdit)\">Редактировать</button>\r\n        </div>\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"tournaments-command-title\">\r\n        Состав\r\n    </div>\r\n\r\n    <table class=\"lk-command\">\r\n        <tr class=\"lk-player\">\r\n            <td class=\"lk-number-count title-header\">\r\n                №\r\n            </td>\r\n            <td class=\"lk-surname title-header\">\r\n                Фамилия\r\n            </td>\r\n            <td class=\"lk-full-name title-header\">\r\n                Имя\r\n            </td>\r\n            <td class=\"lk-last-name title-header\">\r\n                Отчество\r\n            </td>\r\n            <td class=\"lk-number title-header\">\r\n                Номер в поле\r\n            </td>\r\n            <td class=\"delet-player title-header\">\r\n                Удалить\r\n            </td>\r\n        </tr>\r\n\r\n        <tr class=\"lk-player\" *ngFor=\"let player of account.command; let i = index\">\r\n            <td class=\"lk-number-count\">\r\n                {{i+1}}\r\n            </td>\r\n            <td class=\"lk-surname\">\r\n                {{player.surname}}\r\n            </td>\r\n            <td class=\"lk-full-name\">\r\n                {{player.name}}\r\n            </td>\r\n            <td class=\"lk-last-name\">\r\n                {{player.middleName}}\r\n            </td>\r\n            <td class=\"lk-number\">\r\n                <input class=\"edit-number\" name=\"number\" #number=\"ngModel\" [(ngModel)]=\"player.number\" [disabled]=\"isEdit\" pattern=\"[0-9]*\" (change)=\"changeInfoPlayer(player, number.hasError('pattern'))\" />\r\n            </td>\r\n            <td class=\"delet-player delet-player-img\" (click)=\"selectPlayer(player.playerId, i)\" data-toggle=\"modal\" data-target=\"#myModal\"></td>\r\n        </tr>\r\n    </table>\r\n\r\n</div>\r\n\r\n<div class=\"transparent-layer-player\" id=\"transparent-layer-player\">\r\n    <div class=\"add-player\" [ngStyle]=\"addPlayerBlockStyle()\">\r\n        <form class=\"example-form\" #newplayer=\"ngForm\" novalidate autocomplete=\"on\">\r\n            <mat-form-field>\r\n                <input placeholder=\"Фамилия\" matInput type=\"text\" name=\"surname\" [(ngModel)]=\"player.surname\" required />\r\n            </mat-form-field>\r\n            <mat-form-field>\r\n                <input placeholder=\"Имя\" matInput type=\"text\" name=\"name\" [(ngModel)]=\"player.name\" required />\r\n            </mat-form-field>\r\n            <mat-form-field>\r\n                <input placeholder=\"Отчество\" matInput type=\"text\" name=\"middleName\" [(ngModel)]=\"player.middleName\" required />\r\n            </mat-form-field>\r\n            <mat-form-field>\r\n                <input placeholder=\"Номер в поле\" matInput type=\"text\" #newNumber=\"ngModel\" name=\"number\" [(ngModel)]=\"player.number\" pattern=\"[0-9]*\" required />\r\n            </mat-form-field>\r\n            <button mat-button (click)=\"addPlayer(newplayer.invalid, newNumber.hasError('pattern'))\">Добавить</button>\r\n            <button mat-button (click)=\"close()\">Отмена</button>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n        \r\n            <div class=\"modal-body\">\r\n                Удалить игрока?\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"dellPlayer()\">ДА</button>\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Отмена</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 929:
/***/ (function(module, exports) {

module.exports = "<div class=\"command-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n\r\n    <div class=\"command-title\">\r\n        <div class=\"news-logo-photo\">\r\n        </div>\r\n        <div class=\"command-title-text\">\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"news-home\" *ngIf=\"newss\">\r\n        <div *ngFor=\"let news of newss; let i = index\" class=\"news-block\">\r\n            <div class=\"news-content\">\r\n                <div *ngIf=\"news.type == 1\" class=\"news-text-block\">\r\n                    <div class=\"news-title\">\r\n                        {{news.title}}\r\n                        <div class=\"news-date\">\r\n                            {{news.date}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"text-news-content\">\r\n\r\n                        <div class=\"news-text\">\r\n                            <div class=\"news-photo\" [style.background-image]='news.photo[0].url'></div>\r\n                            {{news.text}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf=\"news.type == 2\" class=\"news-photo-block\">\r\n                    <div id=\"photo-content\" class=\"photo-news-content\">\r\n                        <div class=\"news-title\">\r\n                            {{news.title}}\r\n                            <div class=\"news-date\">\r\n                                {{news.date}}\r\n                            </div>\r\n                        </div>\r\n                        <div id=\"{{'display'+ i}}\" class=\"news-photo-display\" [style.background-image]=\"news.photo[0].url\"></div>\r\n                        <div class=\"photo-button-content\">\r\n                            <div *ngFor=\"let photo of news.photo\" class=\"news-photo-button\" (click)=\"showImg(photo.url, i)\" [style.background-image]=\"photo.url\"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf=\"news.type == 3\" class=\"news-video-block\">\r\n                    <div class=\"video-news-content\">\r\n                        <div class=\"news-title\">\r\n                            {{news.title}}\r\n                            <div class=\"news-date\">\r\n                                {{news.date}}\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"news-video\">\r\n                            <vg-player>\r\n                                <vg-controls>\r\n                                    <vg-play-pause></vg-play-pause>\r\n                                    <vg-time-display vgProperty=\"current\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                                    <vg-scrub-bar>\r\n                                        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\r\n                                        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\r\n                                    </vg-scrub-bar>\r\n                                    <vg-time-display vgProperty=\"total\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                                    <vg-mute></vg-mute>\r\n                                    <vg-volume></vg-volume>\r\n                                    <vg-fullscreen></vg-fullscreen>\r\n                                </vg-controls>\r\n                                <video #media [vgMedia]=\"media\" id=\"singleVideo\" preload=\"auto\" crossorigin=\"\">\r\n                                    <source src='{{news.urlVideo}}' type=\"video/mp4\">\r\n                                </video>\r\n                            </vg-player>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 930:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Display = (function () {
    function Display(url, position) {
        this.url = url;
        this.position = position;
    }
    return Display;
}());
exports.Display = Display;


/***/ }),

/***/ 931:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GetPhotoRequest = (function () {
    function GetPhotoRequest(page, id) {
        this.page = page;
        this.id = id;
    }
    return GetPhotoRequest;
}());
exports.GetPhotoRequest = GetPhotoRequest;


/***/ }),

/***/ 932:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GetPhotoResponse = (function () {
    function GetPhotoResponse(currentPage, pageSize, photos) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.photos = photos;
    }
    return GetPhotoResponse;
}());
exports.GetPhotoResponse = GetPhotoResponse;


/***/ }),

/***/ 933:
/***/ (function(module, exports) {

module.exports = "<div class=\"command-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n\r\n\r\n    <div id=\"photo-content\" class=\"photo-news-content\">\r\n        <div class=\"news-title-photo\">\r\n        </div>\r\n        <div class=\"photo-content\">\r\n            <div *ngFor=\"let url of pagePhotos.photos; let i = index\" class=\"photo-button\" (click)=\"openPhoto(url, i)\" [style.background-image]=\"url\"></div>\r\n        </div>\r\n        <div class=\"photo-filter\">\r\n            <div class=\"filter-title-text-comand\">Выберете команду</div>\r\n            <div class=\"filter-command\">\r\n                <div class=\"command-filter-button\" *ngFor=\"let command of commandFilter\">\r\n                    <mat-slide-toggle [checked]=\"command.id==commandId\" (change)=\"filterCommand(command.id, $event.checked)\">{{command.name}}</mat-slide-toggle>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"nav-content\">\r\n            <div class=\"nav\">\r\n                <div class=\"left\" width=\"40\" height=\"40\" (click)=\"nextLeftPage()\"> </div>\r\n                <div class=\"right\" width=\"40\" height=\"40\" (click)=\"nextRightPage()\"> </div>\r\n                <ul class=\"pages\">\r\n                    <li class=\"first-page\" [ngStyle]=\"pageStyle(1)\" (click)=\"getPage(1)\">1</li>\r\n                    <li *ngFor=\"let page of pageSize\" [ngStyle]=\"pageStyle(page)\" (click)=\"getPage(page)\">{{page}}</li>\r\n                    <li *ngIf=\"pagePhotos.pageSize > 1\" class=\"last-page\" [ngStyle]=\"pageStyle(pagePhotos.pageSize)\" (click)=\"getPage(pagePhotos.pageSize)\">{{pagePhotos.pageSize}}</li>\r\n                    <li>всего - {{pagePhotos.pageSize}}</li>\r\n                </ul>\r\n                <span></span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div id=\"photo-layer\" class=\"photo-layer\">\r\n    <div class=\"photo-show\" [style.background-image]=\"display.url\" [ngStyle]=\"photoShowStyle()\" onmousemove=\"$('.photo-layer').addClass('photo-hover')\" onmouseout=\"$('.photo-layer').removeClass('photo-hover')\">\r\n        <div class=\"button-photo-left\" (click)=\"nextLeftPhoto()\">\r\n        </div>\r\n        <div class=\"button-photo-right\" (click)=\"nextRightPhoto()\">\r\n        </div>\r\n    </div>\r\n    <div class=\"photo-show-close\" (click)=\"closePhoto()\">\r\n    </div>\r\n\r\n</div>";

/***/ }),

/***/ 934:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoginAdmin = (function () {
    function LoginAdmin(login, password) {
        this.login = login;
        this.password = password;
    }
    return LoginAdmin;
}());
exports.LoginAdmin = LoginAdmin;
var IsAuth = (function () {
    function IsAuth(isAuth) {
        this.isAuth = isAuth;
    }
    return IsAuth;
}());
exports.IsAuth = IsAuth;


/***/ }),

/***/ 935:
/***/ (function(module, exports) {

module.exports = "<div class=\"admin-login-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n    <header *ngIf=\"!(page==7)\">\r\n        <div class=\"header-content\">\r\n            <div class=\"logo-olimp\"></div>\r\n            <div class=\"header-logo\"></div>\r\n        </div>\r\n    </header>\r\n    <div class=\"header-hr\">\r\n        Панель Администратора\r\n    </div>\r\n</div>\r\n\r\n<div class=\"admin-authorized\" *ngIf=\"isAuthAdmin\">\r\n    <div class=\"menu\">\r\n        <div class=\"menu-content\">\r\n            <ul class=\"nave nave-tabs\">\r\n                <li [className]=\"page == 8 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\">\r\n                    <a href=\"/#/admin/news\">Новости</a>\r\n                </li>\r\n                <li [className]=\"page == 9 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\">\r\n                    <a href=\"/#/admin/turnament\">Турниры</a>\r\n                </li>\r\n                <li [className]=\"page == 10 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\">\r\n                    <a href=\"/#/comand\">Команды</a>\r\n                </li>\r\n                <li onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\">\r\n                    <div (click)=\"signOutAdmin()\">Выйти</div>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"admin-not-authorized\" *ngIf=\"!isAuthAdmin\">\r\n    <div class=\"admin-authoriz\">\r\n        <form class=\"example-form\" autocomplete=\"on\">\r\n            <div class=\"block center login-block\">\r\n                <input class=\"example-full-width login\" placeholder=\"Логин\" name=\"loginAdmin\" [(ngModel)]=\"loginAdmin.login\" required>\r\n                <span [ngClass]=\"loginAdmin.login ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n            </div>\r\n\r\n            <div class=\"block center login-block\">\r\n                <input type=\"password\" class=\"example-full-width passvord\" placeholder=\"Пароль\" name=\"passwordAdmin\" [(ngModel)]=\"loginAdmin.password\" minlength=\"6\" #password=\"ngModel\" required>\r\n                <span [ngClass]=\"loginAdmin.password && !password.hasError('minlength') ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n            </div>\r\n            <button mat-button [ngClass]=\"(loginAdmin.login && loginAdmin.password && loginAdmin.password && !password.hasError('minlength')) ? 'button-active' : 'button-no-active'\" class=\"button-come-in\" (click)=\"signIn(password.hasError('minlength'))\">Войти</button>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n<router-outlet></router-outlet>";

/***/ }),

/***/ 936:
/***/ (function(module, exports) {

module.exports = "<div class=\"admin-news-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n    <div class=\"admin-news-title\">\r\n        Управление новостями\r\n    </div>\r\n\r\n    <div class=\"admin-list-news-block\">\r\n        <ul>\r\n            <li *ngFor=\"let news of newsInfo; let i = index\">\r\n                <div><p>Название -</p> {{news.title}} </div>\r\n                <div><p>Тип новости -</p> {{news.type | newsType}} </div>\r\n                <div><p>Дата создания(редактирования) -</p> {{ news.date}}</div>\r\n                <div><p>Отображается на главной странице -</p> {{news.top ? \"Да\":\" Нет\"}}</div>\r\n                <button mat-button class=\"button-come-in button-edit-news\" (click)=\"editNews(news.id)\">Редактировать</button>\r\n                <button mat-button class=\"button-come-in button-add-news\" (click)=\"selectNews(news.id, i)\" data-toggle=\"modal\" data-target=\"#myModal\">Удалить</button>\r\n                <mat-checkbox [(ngModel)]=\"news.active\" (change)=\"active(news.id)\">\r\n                    - активна\r\n                </mat-checkbox>\r\n                <hr />\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div class=\"admin-add-news-block\">\r\n        <div class=\"add-news-title\">Добавить новость</div>\r\n\r\n        <div class=\"select-news-title\">Выберете тип новости</div>\r\n        <div class=\"check-news-block\">\r\n            <mat-checkbox [(ngModel)]=\"isText\" (change)=\"isPhoto=false; isVideo=false\">\r\n                Текст\r\n            </mat-checkbox>\r\n            <mat-checkbox [(ngModel)]=\"isPhoto\" (change)=\"isText=false; isVideo=false\">\r\n                Фотоотчет\r\n            </mat-checkbox>\r\n            <mat-checkbox [(ngModel)]=\"isVideo\" (change)=\"isPhoto=false; isText=false\">\r\n                Видео\r\n            </mat-checkbox>\r\n        </div>\r\n        <button mat-button [ngClass]=\"(isText || isPhoto  || isVideo) ? 'button-active' : 'button-no-active'\" class=\"button-come-in\" (click)=\"addNews()\">Создать</button>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n\r\n            <div class=\"modal-body\">\r\n                Удалить новость?\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\"  (click)=\"dellNews()\">ДА</button>\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Отмена</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 937:
/***/ (function(module, exports) {

module.exports = "<div class=\"admin-new-news-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n    <div class=\"admin-news-title\">\r\n        Редактирование новости\r\n    </div>\r\n    <button mat-button class=\"button-back\" (click)=\"back()\">Назад</button>\r\n\r\n    <div class=\"admin-add-news\" *ngIf=\"news.type==1\">\r\n        <div class=\"admin-add-news-title\">\r\n            Заголовок новости\r\n        </div>\r\n        <textarea class=\"admin-add-news-title\" [(ngModel)]=\"news.title\"> </textarea>\r\n        <div class=\"admin-add-news-txt-block\">\r\n            <div>\r\n                Текст новости\r\n            </div>\r\n            <textarea class=\"admin-add-news-txt\" [(ngModel)]=\"news.text\"> </textarea>\r\n        </div>\r\n        <div class=\"profile-image\" [style.background-image]=\"news.photo[0].url\">\r\n        </div>\r\n\r\n        <div class=\"file-upload\">\r\n            <label>\r\n                <input type=\"file\" name=\"file\" accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"fileChangedTypeText($event)\" />\r\n                <span>Загрузить фото</span>\r\n            </label>\r\n        </div>\r\n        <div class=\"admin-news-is-top\">\r\n            <mat-checkbox [(ngModel)]=\"news.top\">\r\n                - Отображать на главной странице\r\n            </mat-checkbox>\r\n        </div>\r\n        <button mat-button class=\"preview-button\" (click)=\"preview()\">Предпросмотр</button>\r\n        <button mat-button [ngClass]=\"(news.title && news.text) ? 'button-active' : 'button-no-active'\" class=\"save-button\" (click)=\"saveNews()\">Сохранить</button>\r\n    </div>\r\n\r\n    <div class=\"admin-add-news\" *ngIf=\"news.type==2\">\r\n        <div class=\"select-command-block\">\r\n            <div class=\"inline-block\">\r\n                <div>Комманда 1</div>\r\n                <select [(ngModel)]=\"news.commandOne\">\r\n                    <option *ngFor=\"let command of commandFilter\" [value]=\"command.id\">\r\n                        {{ command.name }}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n\r\n            <div class=\"inline-block\">\r\n                <div>Комманда 2</div>\r\n                <select [(ngModel)]=\"news.commandTwo\">\r\n                    <option *ngFor=\"let command of commandFilter\" [value]=\"command.id\">\r\n                        {{ command.name }}\r\n                    </option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"admin-add-news-title\">\r\n            Заголовок новости\r\n        </div>\r\n        <textarea class=\"admin-add-news-title\" [(ngModel)]=\"news.title\"> </textarea>\r\n\r\n        <div id=\"preview\" class=\"news-image-content\">\r\n            <div *ngIf=\"isPhoto()\">\r\n                <div class=\"photo\" data-title=\"удалить\" *ngFor=\"let photo of news.photo; let i = index\" (click)=\"dellPhotoForNews(photo.id, i)\">\r\n                    <div [style.background-image]=\"photo.url\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"file-upload\">\r\n            <label>\r\n                <input type=\"file\" name=\"file\" multiple accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"fileChangedTypePhoto($event)\" />\r\n                <span>Загрузить фото</span>\r\n            </label>\r\n        </div>\r\n        <div class=\"admin-news-is-top\">\r\n            <mat-checkbox [(ngModel)]=\"news.top\">\r\n                - Отображать на главной странице\r\n            </mat-checkbox>\r\n        </div>\r\n        <button mat-button class=\"preview-button\" (click)=\"preview()\">Предпросмотр</button>\r\n        <button mat-button [ngClass]=\"news.title ? 'button-active' : 'button-no-active'\" class=\"save-button\" (click)=\"saveNews()\">Сохранить</button>\r\n    </div>\r\n\r\n    <div class=\"admin-add-news\" *ngIf=\"news.type==3\">\r\n        <div class=\"admin-add-news-title\">\r\n            Заголовок новости\r\n        </div>\r\n        <textarea class=\"admin-add-news-title\" [(ngModel)]=\"news.title\"> </textarea>\r\n\r\n        <div class=\"news-no-video-content\" *ngIf=\"!news.urlVideo\">\r\n\r\n        </div>\r\n\r\n        <div class=\"news-video-content\" *ngIf=\"news.urlVideo\">\r\n            <div *ngFor=\"let video of videos\">\r\n                <vg-player>\r\n                    <vg-controls>\r\n                        <vg-play-pause></vg-play-pause>\r\n                        <vg-time-display vgProperty=\"current\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                        <vg-scrub-bar>\r\n                            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\r\n                            <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\r\n                        </vg-scrub-bar>\r\n                        <vg-time-display vgProperty=\"total\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                        <vg-mute></vg-mute>\r\n                        <vg-volume></vg-volume>\r\n                        <vg-fullscreen></vg-fullscreen>\r\n                    </vg-controls>\r\n                    <video #media [vgMedia]=\"media\" id=\"singleVideo\" preload=\"auto\" crossorigin=\"\">\r\n                        <source src='{{video}}' type=\"video/mp4\">\r\n                    </video>\r\n                </vg-player>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"file-upload\">\r\n            <label>\r\n                <input type=\"file\" name=\"file\" multiple accept=\"video/mp4\" (change)=\"fileChangedVideo($event)\" />\r\n                <span>Загрузить видео</span>\r\n            </label>\r\n        </div>\r\n        <div class=\"admin-news-is-top\">\r\n            <mat-checkbox [(ngModel)]=\"news.top\">\r\n                - Отображать на главной странице\r\n            </mat-checkbox>\r\n        </div>\r\n        <button mat-button class=\"preview-button\" (click)=\"preview()\">Предпросмотр</button>\r\n        <button mat-button [ngClass]=\"news.title ? 'button-active' : 'button-no-active'\" class=\"save-button\" (click)=\"saveNews()\">Сохранить</button>\r\n    </div>\r\n\r\n</div>\r\n\r\n\r\n\r\n<div class=\"news-home preview-layer\" id=\"preview-layer\" (click)=\"close()\">\r\n    <div class=\"news-preview-block\">\r\n        <div class=\"news-content\">\r\n            <div *ngIf=\"news.type == 1\" class=\"news-text-block\">\r\n                <div class=\"news-title\">\r\n                    {{news.title}}\r\n                    <div class=\"news-date\">\r\n                        {{news.date}}\r\n                    </div>\r\n                </div>\r\n                <div class=\"text-news-content\">\r\n\r\n                    <div class=\"news-text\">\r\n                        <div class=\"news-photo\" [style.background-image]='news.photo[0].url'></div>\r\n                        {{news.text}}\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div *ngIf=\"news.type == 2\" class=\"news-photo-block\">\r\n                <div id=\"photo-content\" class=\"photo-news-content\">\r\n                    <div class=\"news-title\">\r\n                        {{news.title}}\r\n                        <div class=\"news-date\">\r\n                            {{news.date}}\r\n                        </div>\r\n                    </div>\r\n                    <div *ngIf=\"isPhoto()\">\r\n                        <div id=\"{{'display'+ i}}\" class=\"news-photo-display\" [style.background-image]=\"news.photo[0].url\"></div>\r\n                        <div class=\"photo-button-content\">\r\n                            <div *ngFor=\"let photo of news.photo\" class=\"news-photo-button\" [style.background-image]=\"photo.url\"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div *ngIf=\"news.type == 3\" class=\"news-video-block\">\r\n                <div class=\"video-news-content\">\r\n                    <div class=\"news-title\">\r\n                        {{news.title}}\r\n                        <div class=\"news-date\">\r\n                            {{news.date}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"news-video\" *ngFor=\"let video of videos\">\r\n                        d\r\n                        <vg-player>\r\n                            <vg-controls>\r\n                                <vg-play-pause></vg-play-pause>\r\n                                <vg-time-display vgProperty=\"current\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                                <vg-scrub-bar>\r\n                                    <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\r\n                                    <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\r\n                                </vg-scrub-bar>\r\n                                <vg-time-display vgProperty=\"total\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                                <vg-mute></vg-mute>\r\n                                <vg-volume></vg-volume>\r\n                                <vg-fullscreen></vg-fullscreen>\r\n                            </vg-controls>\r\n                            <video #media [vgMedia]=\"media\" id=\"singleVideo\" preload=\"auto\" crossorigin=\"\">\r\n                                <source src='{{video}}' type=\"video/mp4\">\r\n                            </video>\r\n                        </vg-player>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 938:
/***/ (function(module, exports) {

module.exports = "<div class=\"admin-news-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n    <div class=\"admin-news-title\">\r\n        Управление турнирами\r\n    </div>\r\n\r\n\r\n    <div class=\"admin-list-news-block\">\r\n\r\n        <ul>\r\n            <li *ngFor=\"let turnament of turnaments; let i = index\">\r\n                <div><p>Название -</p> {{turnament.name}} </div>\r\n                <div><p>Тип турнира -</p> {{turnament.type | turnamentType}} </div>\r\n                <div><p>Статус -</p> {{ turnament.step | turnamentStep}}</div>\r\n                <div><p>Дата начала -</p> {{ turnament.dateStart | date:'dd-MM-yyyy'}}</div>\r\n                <div><p>Дата завершения -</p> {{ turnament.dateEnd | date:'dd-MM-yyyy'}}</div>\r\n                <button mat-button class=\"button-come-in button-edit-news\" (click)=\"editTurnament(turnament.id)\">Открыть</button>\r\n                <button mat-button class=\"button-come-in button-add-news\" (click)=\"selectTurnament(turnament.id, i)\" data-toggle=\"modal\" data-target=\"#myModal\">Удалить</button>\r\n                <hr />\r\n            </li>\r\n        </ul>\r\n\r\n    </div>\r\n\r\n    <div class=\"admin-add-turnament-block\">\r\n        <div class=\"add-news-title\">Добавить турнир</div>\r\n\r\n        <div class=\"select-news-title\">Выберете тип турнира</div>\r\n        <div class=\"check-news-block\">\r\n            <mat-checkbox [(ngModel)]=\"isOut\" (change)=\"isMixture=false\">\r\n                На выбывание\r\n            </mat-checkbox>\r\n            <mat-checkbox [(ngModel)]=\"isMixture\" (change)=\"isOut=false\">\r\n                Смешанный\r\n            </mat-checkbox>\r\n        </div>\r\n        <button mat-button [ngClass]=\"(isOut || isMixture) ? 'button-active' : 'button-no-active'\" class=\"button-come-in\" (click)=\"addTurnament((isOut||isMixture), isOut ? 1 : isMixture ? 2: 0)\">Создать</button>\r\n    </div>\r\n\r\n\r\n</div>\r\n\r\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n\r\n            <div class=\"modal-body\">\r\n                Удалить турнир?\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"dellTurnament()\">ДА</button>\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Отмена</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 939:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SaveTurnamentInfoRequest = (function () {
    function SaveTurnamentInfoRequest(turnament) {
        this.turnament = turnament;
    }
    return SaveTurnamentInfoRequest;
}());
exports.SaveTurnamentInfoRequest = SaveTurnamentInfoRequest;
var TurnamentStepRequest = (function () {
    function TurnamentStepRequest(id, step) {
        this.id = id;
        this.step = step;
    }
    return TurnamentStepRequest;
}());
exports.TurnamentStepRequest = TurnamentStepRequest;
var DeclareRequest = (function () {
    function DeclareRequest(turnamentId, commandId) {
        this.turnamentId = turnamentId;
        this.commandId = commandId;
    }
    return DeclareRequest;
}());
exports.DeclareRequest = DeclareRequest;
var RemoveDeclareRequest = (function () {
    function RemoveDeclareRequest(turnamentId, commandId, cause) {
        this.turnamentId = turnamentId;
        this.commandId = commandId;
        this.cause = cause;
    }
    return RemoveDeclareRequest;
}());
exports.RemoveDeclareRequest = RemoveDeclareRequest;


/***/ }),

/***/ 940:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TurnamentInfo = (function () {
    function TurnamentInfo(id, name, dateStart, dateEnd, type, stateCode, step) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.type = type;
        this.stateCode = stateCode;
        this.step = step;
    }
    return TurnamentInfo;
}());
exports.TurnamentInfo = TurnamentInfo;
var GetTurnament = (function () {
    function GetTurnament(id, name, dateStart, dateEnd, type, stateCode, step, description, contributionGame, contributionTournament, commands, positionCommand, gameTurnament) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.type = type;
        this.stateCode = stateCode;
        this.step = step;
        this.description = description;
        this.contributionGame = contributionGame;
        this.contributionTournament = contributionTournament;
        this.commands = commands;
        this.positionCommand = positionCommand;
        this.gameTurnament = gameTurnament;
    }
    return GetTurnament;
}());
exports.GetTurnament = GetTurnament;
var PositionCommand = (function () {
    function PositionCommand(id, position, commandId, commandName, points, place) {
        this.id = id;
        this.position = position;
        this.commandId = commandId;
        this.commandName = commandName;
        this.points = points;
        this.place = place;
    }
    return PositionCommand;
}());
exports.PositionCommand = PositionCommand;
var GameTurnament = (function () {
    function GameTurnament(id, idCommandOne, idCommandTwo, tour, dateStart, commandOneGoals, commandTwoGoals, commandOnePoints, commandTwoPoints) {
        if (dateStart === void 0) { dateStart = null; }
        this.id = id;
        this.idCommandOne = idCommandOne;
        this.idCommandTwo = idCommandTwo;
        this.commandOneGoals = commandOneGoals;
        this.commandTwoGoals = commandTwoGoals;
        this.commandOnePoints = commandOnePoints;
        this.commandTwoPoints = commandTwoPoints;
    }
    return GameTurnament;
}());
exports.GameTurnament = GameTurnament;


/***/ }),

/***/ 941:
/***/ (function(module, exports) {

module.exports = "<div class=\"admin-tuning-turnament-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n    <div class=\"inline-block admin-turnament-status\">\r\n        этап -\r\n        <div class=\"inline-block\">\r\n            <select [(ngModel)]=\"turnament.step\" (change)=\"changeStep($event.target.value)\">\r\n                <option [value]=\"0\">\r\n                    Редактирование\r\n                </option>\r\n                <option [value]=\"1\">\r\n                    Регистрация\r\n                </option>\r\n                <option [value]=\"2\">\r\n                    Построение\r\n                </option>\r\n                <option [value]=\"3\">\r\n                    В процессе\r\n                </option>\r\n                <option [value]=\"4\">\r\n                    Завершен\r\n                </option>\r\n            </select>\r\n        </div>\r\n    </div>\r\n\r\n    <button *ngIf=\"turnament.step == 0\" mat-button class=\"open-reg-button-turnament button-active\" (click)=\"openRegistration()\">Открыть для регистрации</button>\r\n    <button *ngIf=\"turnament.step == 1\" mat-button class=\"open-reg-button-turnament button-active\" (click)=\"completeRegistration()\">Завершить регистрацию</button>\r\n    <button mat-button class=\"button-back\" (click)=\"back()\">Назад</button>\r\n\r\n    <div class=\"admin-tuning-turnament\">\r\n        <div>\r\n            <p>Название</p>\r\n            <textarea class=\"admin-turnament-name\" [(ngModel)]=\"turnament.name\"> </textarea>\r\n        </div>\r\n\r\n        <div>\r\n            <p>Описание</p>\r\n            <textarea class=\"admin-turnament-description\" [(ngModel)]=\"turnament.description\"> </textarea>\r\n        </div>\r\n\r\n        <div class=\"inline-block\">\r\n            <p>Тип</p>\r\n            <select [(ngModel)]=\"turnament.type\">\r\n                <option [value]=\"1\">\r\n                    Круговой\r\n                </option>\r\n                <option [value]=\"2\">\r\n                    Смешанный\r\n                </option>\r\n            </select>\r\n        </div>\r\n\r\n        <div class=\"inline-block\">\r\n            <p>Взнос за турнир</p>\r\n            <input type=\"number\" [(ngModel)]=\"turnament.contributionTournament\" />\r\n        </div>\r\n        <div class=\"inline-block\">\r\n            <p>Взнос за игру</p>\r\n            <input type=\"number\" [(ngModel)]=\"turnament.contributionGame\" />\r\n        </div>\r\n        <div class=\"inline-block\">\r\n            <p>Дата начала</p>\r\n            <input type=\"date\" [ngModel]=\"turnament.dateStart | date:'yyyy-MM-dd'\" (ngModelChange)=\"turnament.dateStart = $event\">\r\n        </div>\r\n\r\n        <button mat-button class=\"save-button-turnament button-active\" (click)=\"saveTurnament()\">Сохранить</button>\r\n    </div>\r\n\r\n    <div *ngIf=\"turnament.step == 1\" class=\"building-title\">\r\n        Идет регистрация...\r\n    </div>\r\n\r\n    <button *ngIf=\"turnament.step == 2\" mat-button class=\"calculate-table button-active\" (click)=\"calculateTable()\">Расчитать таблицу</button>\r\n    \r\n    <div class=\"admin-tuning-turnament-block\" *ngIf=\"turnament.step != 0\">\r\n        <div class=\"button-turnament-block\" *ngIf=\"turnament.step != 1\">\r\n            <div mat-button [className]=\"page == 1 ? 'turnament-control-active' : 'turnament-control'\" (click)=\"page=1\">Команды</div>\r\n            <div mat-button [className]=\"page == 2 ? 'turnament-control-active' : 'turnament-control'\" (click)=\"page=2\">Турнир</div>\r\n        </div>\r\n\r\n        <div class=\"tournaments-command-content\" *ngIf=\"page == 1\">\r\n            <div class=\"tournaments-command-title inline-block\">\r\n                Команды\r\n            </div>\r\n\r\n            <table class=\"lk-command\">\r\n                <tr>\r\n                    <td class=\"title-header\">\r\n                        №\r\n                    </td>\r\n                    <td class=\"title-header\">\r\n                        Названия команд заявленных на турнир\r\n                    </td>\r\n                    <td class=\"title-header\">\r\n                        Статус заявки\r\n                    </td>\r\n                    <td class=\"delet-player title-header\">\r\n                        Удалить\r\n                    </td>\r\n                </tr>\r\n\r\n                <tr *ngFor=\"let command of turnament.commands; let j = index\">\r\n                    <td>\r\n                        {{j+1}}\r\n                    </td>\r\n                    <td>\r\n                        {{command.name}}\r\n                    </td>\r\n                    <td *ngIf=\"!command.status\">\r\n                        <div class=\"button-turnament-decision\" (click)=\"acceptDeclare(turnament.id, command.id, j)\">принять</div>\r\n                        <div class=\"button-turnament-decision\" (click)=\"selectDeclare(command.id, i)\" data-toggle=\"modal\" data-target=\"#myModal\">отказать</div>\r\n                    </td>\r\n                    <td *ngIf=\"command.status\" class=\"adopted\">\r\n                        принята\r\n                    </td>\r\n                    <td *ngIf=\"command.status\" class=\"delet-player delet-player-img\" (click)=\"selectDeclare(command.id, i)\" data-toggle=\"modal\" data-target=\"#myModal\"></td>\r\n                    <td *ngIf=\"!command.status\"></td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n\r\n        <div class=\"tournaments-command-content\" *ngIf=\"page == 2\">\r\n\r\n            <table class=\"lk-command\">\r\n                <tr *ngFor=\"let row of rowSize; let r = index\">\r\n                    <td *ngFor=\"let col of colSize; let c = index\">\r\n                        {{table[r][c]}}\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n            <div *ngFor=\"let tour of tours\">\r\n                <div *ngFor=\"let game of tour\">\r\n                    {{game.idCommandOne}} VS {{game.idCommandTwo}}\r\n                </div>\r\n                -----------------------------------------------------\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"declare-modal-content\">\r\n            <div class=\"modal-body\">\r\n                Отказать в участии?\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                Причина\r\n                <textarea type=\"text\" [(ngModel)]=\"cause\"></textarea>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"removeDeclare()\">ДА</button>\r\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"cause = null\">Отмена</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 942:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var router_1 = __webpack_require__(64);
var authentication_1 = __webpack_require__(204);
var authorizationRequest_1 = __webpack_require__(388);
var emailRequest_1 = __webpack_require__(943);
var page_1 = __webpack_require__(38);
var email_1 = __webpack_require__(395);
var common_1 = __webpack_require__(73);
var user_1 = __webpack_require__(944);
var App = (function () {
    function App(toastr, vcr, authenticationService, pageService, emailService, router) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.authenticationService = authenticationService;
        this.pageService = pageService;
        this.emailService = emailService;
        this.router = router;
        this.ex = true;
        this.selectPage = 1;
        this.isValid = false;
        this.isCode = false;
        this.user = new user_1.UserRegistration(null, null, null, null, null, null);
        this.toastr.setRootViewContainerRef(vcr);
    }
    App.prototype.ngOnInit = function () {
        var self = this;
        document.getElementById("g-loader").style.display = 'none';
        self.getAccount();
        self.user.email = "Olimp-Portal@yandex.ru";
        self.pageService.recipeSelected.subscribe(function (page) {
            self.page = page;
        });
    };
    App.prototype.getAccount = function () {
        var self = this;
        self.busy = self.authenticationService.GetAccount().then(function (response) {
            self.name = response.login;
            self.isAuth = response.isAuth;
        });
    };
    App.prototype.signOutUser = function () {
        var self = this;
        self.busy = self.authenticationService.SignOutUser().then(function (response) {
            self.toastr.info("До свидания!", self.name);
            self.isAuth = false;
            self.router.navigate([common_1.Common.RoutePaths.Home], { queryParams: {} });
        });
    };
    App.prototype.isExit = function () {
        var self = this;
        var buttom = document.getElementById("exit2");
        var cabinet = document.getElementById("cabinet");
        if (self.ex) {
            buttom.style.marginLeft = document.getElementById("exit1").clientWidth - 30 + "px";
            cabinet.style.marginLeft = (30 - cabinet.clientWidth) + "px";
        }
        else {
            buttom.style.marginLeft = "0px";
            cabinet.style.marginLeft = "0px";
        }
        self.ex = !self.ex;
    };
    App.prototype.userPage = function (page) {
        var self = this;
        self.selectPage = page;
        self.user.password = null;
        self.passwordTo = null;
    };
    App.prototype.signInUser = function () {
        var self = this;
        if (self.user.login == null || self.user.password == null || self.user.login == "" || self.user.password == "") {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        self.busy = self.authenticationService.SignInUser(new authorizationRequest_1.AuthorizationRequest(self.user.login, self.user.password)).then(function (response) {
            self.close();
            self.isValid = false;
            self.name = response;
            self.isAuth = true;
            self.toastr.info("Добро пожаловть!", response);
        });
    };
    App.prototype.registratioBlockStyle = function () {
        var self = this;
        var top = (window.outerHeight - 500) / 2;
        return {
            "margin-top": top + "px"
        };
    };
    App.prototype.goCome = function () {
        var self = this;
        self.userPage(1);
        document.getElementById("transparent-layer").style.display = "block";
    };
    App.prototype.close = function () {
        document.getElementById("transparent-layer").style.display = "none";
    };
    App.prototype.singCodeToEmail = function () {
        var self = this;
        if (self.user.email == null || self.user.email.length == 0) {
            self.toastr.error("Не заполнен адресс электронной почты");
            return;
        }
        self.busy = self.emailService.singCodeToEmail(new emailRequest_1.SingCodeToEmailRequest(self.user.email, null)).then(function (response) {
            self.toastr.success("Код подтверждения отправлен на почтовый адрес");
        });
    };
    App.prototype.registration = function (isValid, isCode) {
        var self = this;
        if (isValid) {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        if (!isCode) {
            self.toastr.error("Ведите код подтверждения");
            return;
        }
        self.busy = self.authenticationService.registration(self.user)
            .then(function (response) {
            self.toastr.success("Регистрация прошла успешно");
            self.router.navigate([common_1.Common.RoutePaths.Cabinet], { queryParams: {} });
            self.close();
            self.getAccount();
        })
            .catch(function (response) {
            self.user.code = null;
        });
    };
    App.prototype.goCabinet = function () {
        var self = this;
        document.getElementById("exit2").style.marginLeft = "0px";
        document.getElementById("cabinet").style.marginLeft = "0px";
        self.router.navigate([common_1.Common.RoutePaths.Cabinet], { queryParams: {} });
    };
    App.prototype.confirmTheCode = function () {
        var self = this;
        if (self.user.code == null || self.user.code.toString().length == 0) {
            self.toastr.error("Не заполнен код подтверждения");
            return;
        }
        self.busy = self.authenticationService.confirmTheCode(self.user)
            .then(function (response) {
            self.isCode = true;
            self.toastr.success("Код подтвержден");
        })
            .catch(function (response) {
            self.user.code = null;
        });
    };
    App.prototype.singCodeToEmailReplace = function (isValid) {
        var self = this;
        if (isValid) {
            self.toastr.error("Не все поля заполнены");
            return;
        }
        self.busy = self.emailService.singCodeToEmail(new emailRequest_1.SingCodeToEmailRequest(self.user.email, self.user.login)).then(function (response) {
            self.toastr.success("Код подтверждения отправлен на почтовый адрес");
        });
    };
    App.prototype.replacePassvord = function () {
        var self = this;
        if (self.user.password == null || self.user.password.length == 0 && self.user.password != self.passwordTo) {
            self.toastr.error("Некоректный пароль");
            return;
        }
        self.busy = self.authenticationService.replacePassvord(self.user).then(function (response) {
            self.toastr.success("Пароль изменен");
            self.userPage(1);
        });
    };
    App = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__(945),
            providers: [page_1.PageService]
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            authentication_1.AuthenticationService,
            page_1.PageService,
            email_1.EmailService,
            router_1.Router])
    ], App);
    return App;
}());
exports.App = App;


/***/ }),

/***/ 943:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SingCodeToEmailRequest = (function () {
    function SingCodeToEmailRequest(email, login) {
        var self = this;
        self.email = email;
        self.login = login;
    }
    return SingCodeToEmailRequest;
}());
exports.SingCodeToEmailRequest = SingCodeToEmailRequest;


/***/ }),

/***/ 944:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserAuthentication = (function () {
    function UserAuthentication(login, password) {
        this.login = login;
        this.password = password;
    }
    return UserAuthentication;
}());
exports.UserAuthentication = UserAuthentication;
var UserRegistration = (function () {
    function UserRegistration(login, password, email, commandName, mobile, code) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.commandName = commandName;
        this.mobile = mobile;
        this.code = code;
    }
    return UserRegistration;
}());
exports.UserRegistration = UserRegistration;
var Account = (function () {
    function Account(name, isAuth) {
        this.name = name;
        this.isAuth = isAuth;
    }
    return Account;
}());
exports.Account = Account;


/***/ }),

/***/ 945:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-block\">\r\n    <header *ngIf=\"page<7\">\r\n        <div class=\"header-content\">\r\n            <div class=\"logo-olimp\"></div>\r\n            <div class=\"header-logo\"></div>\r\n            <div *ngIf=\"!isAuth\" class=\"registration\" (click)=\"goCome()\">Войти</div>\r\n            <div class=\"menu\">\r\n                <div class=\"menu-content\">\r\n                    <ul class=\"nave nave-tabs\">\r\n                        <li [className]=\"page == 1 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\"><a href=\"/#/\">Главная <span class=\"home\"></span></a></li>\r\n                        <li class=\"dropdown\" [className]=\"page == 2 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\">\r\n                            <a data-toggle=\"dropdown\" class=\"a-navbar\" id=\"nav_home\">Турниры <span class=\"caret\"></span> <span class=\"wreath\"></span> </a>\r\n                            <ul class=\"dropdown-menu dropped\">\r\n                                <li><a href=\"/#/current-tournaments\">Текущие турниры</a> </li>\r\n                                <li><a href=\"/#/new-tournaments\">Будущие турниры</a> </li>\r\n                                <li><a href=\"/#/past-tournaments\">Прошедшие турниры</a> </li>\r\n                            </ul>\r\n                        </li>\r\n                        <li [className]=\"page == 3 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\"><a href=\"/#/comand\">Команды<span class=\"comand\"></span></a></li>\r\n                        <li [className]=\"page == 4 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\"><a href=\"/#/news\">Новости<span class=\"news\"></span></a></li>\r\n                        <li [className]=\"page == 5 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\"><a href=\"/#/photo\">Фото<span class=\"photo-menu\"></span></a></li>\r\n                        <li [className]=\"page == 6 ? 'active' : ''\" onmousemove=\"$(this).addClass('focus-over')\" onmouseout=\"$('.focus-over').removeClass('focus-over')\"><a href=\"/#/video\">Видео<span class=\"video-menu\"></span></a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"exit-block\">\r\n                <div *ngIf=\"isAuth\" (click)=\"isExit()\" id=\"exit1\" class=\"exit\">{{name}}</div>\r\n                <div *ngIf=\"isAuth\" (click)=\"signOutUser()\" id=\"exit2\" class=\"exit-up\">Выйти</div>\r\n                <div *ngIf=\"isAuth\" (click)=\"goCabinet()\" id=\"cabinet\" class=\"cabinet\">Кабинет</div>\r\n            </div>\r\n        </div>\r\n    </header>\r\n</div>\r\n\r\n<div class=\"transparent-layer\" id=\"transparent-layer\">\r\n    <div class=\"registration-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\" [ngStyle]=\"registratioBlockStyle()\">\r\n        <div class=\"close-button\" (click)=\"close()\"></div>\r\n        <div class=\"login-button\" [ngClass]=\"selectPage == 1 ? 'active-button' : 'unactive-button'\" (click)=\"userPage(1)\">Вход</div>\r\n        <div class=\"registration-button\" [ngClass]=\"selectPage == 2 ? 'active-button' : 'unactive-button'\" (click)=\"userPage(2)\">Регистрация</div>\r\n        <div class=\"reestablish-button\" [ngClass]=\"selectPage == 3 ? 'active-button' : 'unactive-button'\" (click)=\"userPage(3)\">Забыли пароль?</div>\r\n\r\n\r\n        <div class=\"login-content\" *ngIf=\"selectPage == 1\">\r\n            <form class=\"example-form\" autocomplete=\"on\">\r\n\r\n                <div class=\"block center login-block\">\r\n                    <input class=\"example-full-width login\" placeholder=\"Логин\" name=\"login\" [(ngModel)]=\"user.login\" required>\r\n                    <span [ngClass]=\"user.login ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                </div>\r\n\r\n                <div class=\"block center login-block\">\r\n                    <input type=\"password\" class=\"example-full-width passvord\" placeholder=\"Пароль\" name=\"password\" [(ngModel)]=\"user.password\" minlength=\"5\" #password=\"ngModel\" required>\r\n                    <span [ngClass]=\"user.password && !password.hasError('minlength') ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                </div>\r\n\r\n                <button mat-button [ngClass]=\"(user.login && user.password && user.password && !password.hasError('minlength')) ? 'button-active' : 'button-no-active'\" class=\"button-come-in\" (click)='signInUser()'>Войти</button>\r\n            </form>\r\n        </div>\r\n\r\n        <div class=\"login-content-registration\" *ngIf=\"selectPage == 2\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n            <form class=\"example-form\" #regisrtation=\"ngForm\" novalidate autocomplete=\"on\">\r\n\r\n                <div class=\"inline-block\">\r\n                    <div class=\"block\">\r\n                        <input class=\"reg-input\" placeholder=\"Логин *\" name=\"login\" [(ngModel)]=\"user.login\" required>\r\n                        <span [ngClass]=\"user.login ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                    </div>\r\n\r\n                    <div class=\"block\">\r\n                        <input class=\"reg-input\" type=\"password\" placeholder=\"Пароль *\" name=\"password\" [(ngModel)]=\"user.password\" minlength=\"5\" #password=\"ngModel\" required>\r\n                        <span [ngClass]=\"user.password && !password.hasError('minlength') ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                    </div>\r\n\r\n                    <div class=\"block\">\r\n                        <input class=\"reg-input\" type=\"password\" placeholder=\"Повторите пароль *\" name=\"passwordTo\" [(ngModel)]=\"passwordTo\" required>\r\n                        <span [ngClass]=\"user.password == passwordTo && passwordTo ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"inline-block\">\r\n                    <div class=\"block\">\r\n                        <input class=\"reg-input\" placeholder=\"Название команды*\" name=\"commandName\" [(ngModel)]=\"user.commandName\" required>\r\n                        <span [ngClass]=\"user.commandName ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                    </div>\r\n\r\n                    <div class=\"block\">\r\n                        <input class=\"reg-input\" placeholder=\"Введите email адресс *\" name=\"email\" [(ngModel)]=\"user.email\" required pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" #email=\"ngModel\">\r\n                        <span [ngClass]=\"user.email && !email.hasError('pattern') ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                    </div>\r\n\r\n                    <div class=\"block\">\r\n                        <input class=\"reg-input\" placeholder=\"Контактный телефон *\" name=\"mobile\" [(ngModel)]=\"user.mobile\" pattern=\"[0-9]*\" #mobile=\"ngModel\" required>\r\n                        <span [ngClass]=\"user.mobile && !mobile.hasError('pattern') ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                    </div>\r\n                </div>\r\n\r\n                <label class=\"mandatory\">* обязательные поля</label>\r\n\r\n                <button mat-button class=\"button-code-registration\" [ngClass]=\"user.email && !email.hasError('pattern') ? 'button-active' : 'button-no-active'\" (click)='singCodeToEmail()'>Выслать код на email</button>\r\n\r\n                <input class=\"form-control label-kode\" type=\"text\" placeholder=\"код *\" name=\"code\" [(ngModel)]=\"user.code\" />\r\n\r\n                <button mat-button class=\"button-registration\" [ngClass]=\"!(regisrtation.invalid) && user.code && user.password == passwordTo ? 'button-active' : 'button-no-active'\" (click)='registration(regisrtation.invalid, user.code ? true : false)'>Зарегистрировать</button>\r\n            </form>\r\n        </div>\r\n\r\n        <div class=\"login-content-registration\" *ngIf=\"selectPage == 3\">\r\n            <form class=\"example-form\" #password=\"ngForm\" novalidate autocomplete=\"on\">\r\n\r\n                <div class=\"inline-block\">\r\n                    <input class=\"reg-input\" placeholder=\"Логин *\" name=\"login\" [(ngModel)]=\"user.login\" required>\r\n                    <span [ngClass]=\"user.login ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                </div>\r\n\r\n                <div class=\"inline-block\">\r\n                    <input class=\"reg-input\" placeholder=\"Введите email адресс *\" name=\"email *\" [(ngModel)]=\"user.email\" required pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" #email=\"ngModel\">\r\n                    <span [ngClass]=\"user.email && !email.hasError('pattern') ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                </div>\r\n\r\n                <button mat-button class=\"button-code\" [ngClass]=\"user.email && user.login && !email.hasError('pattern') ? 'button-active' : 'button-no-active'\" (click)='singCodeToEmailReplace(password.invalid)'>Выслать код на email</button>\r\n\r\n                <input class=\"form-control label-kode\" type=\"text\" placeholder=\"код *\" name=\"code\" [(ngModel)]=\"user.code\" />\r\n\r\n                <button mat-button class=\"button-code\" [ngClass]=\"user.code ? 'button-active' : 'button-no-active'\" (click)='confirmTheCode()'>Подтвердить код</button>\r\n\r\n                <div class=\"password-remove\">\r\n                    <div class=\"inline-block\">\r\n                        <input [disabled]=\"!isCode\" class=\"reg-input passvord\" type=\"password\" placeholder=\"Новый пароль\" name=\"password\" [(ngModel)]=\"user.password\" minlength=\"5\" #password=\"ngModel\">\r\n                        <span [ngClass]=\"user.password && !password.hasError('minlength') ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                    </div>\r\n\r\n                    <div class=\"inline-block\">\r\n                        <input [disabled]=\"!isCode\" class=\"reg-input passvord\" type=\"password\" placeholder=\"Повторите новый пароль\" name=\"passwordTo\" [(ngModel)]=\"passwordTo\">\r\n                        <span [ngClass]=\"user.password == passwordTo && passwordTo ? 'valid-true' : 'valid-false'\" class=\"marcer\"></span>\r\n                    </div>\r\n\r\n                    <button [disabled]=\"!isCode\" mat-button class=\"button-registration\" [ngClass]=\"isCode ? 'button-active' : 'button-no-active'\" (click)='replacePassvord()'>Изменить пароль</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"content\">\r\n    <router-outlet></router-outlet>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 946:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ng2_toastr_1 = __webpack_require__(21);
var public_1 = __webpack_require__(88);
var page_1 = __webpack_require__(38);
var video_1 = __webpack_require__(947);
var VideoCommand = (function () {
    function VideoCommand(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        this.videos = new Array();
        this.sources = new Array();
        this.dateTo = null;
        this.myDatePickerOptions = {
            dateFormat: 'dd.mm.yyyy'
        };
        var self = this;
        self.getCommandFilter();
        self.videoTitle = 'ttttttttttttttttttt';
        self.sources.push('http://vjs.zencdn.net/v/oceans.mp4');
        self.videos.push(new video_1.Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("12.12.2332  арсенал vs дрова 1-3", '/content/video/videogular.mp4'));
        self.videos.push(new video_1.Video("acesssssssssssssssssan", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video(" angular", '/content/video/videogular.mp4'));
        self.videos.push(new video_1.Video("kkkssssss ssssssssssssss sssssssss ssskkk", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("angular", '/content/video/videogular.mp4'));
        self.videos.push(new video_1.Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("acssssssssssss ssssssssssssss ssssssssean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("angular", '/content/video/videogular.mp4'));
    }
    VideoCommand.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(6);
    };
    VideoCommand.prototype.getCommandFilter = function () {
        var self = this;
        self.busy = self.home.GetCommandFilter().then(function (response) {
            self.commandFilter = response.commandFilter;
        });
    };
    VideoCommand.prototype.showVideo = function (url, title) {
        var self = this;
        self.videoTitle = title;
        self.sources = new Array();
        self.sources.push(url);
    };
    VideoCommand.prototype.filterCommand = function (id, checked) {
        var self = this;
        console.dir(checked);
        var D = self.dateTo;
    };
    VideoCommand.prototype.filterDate = function (event, type) {
        var self = this;
        switch (type) {
            case 1:
                console.dir("1- " + event);
                break;
            case 2:
                console.dir("2- " + event);
                break;
        }
    };
    VideoCommand = __decorate([
        core_1.Component({
            selector: 'video-command',
            template: __webpack_require__(948)
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService])
    ], VideoCommand);
    return VideoCommand;
}());
exports.VideoCommand = VideoCommand;


/***/ }),

/***/ 947:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Video = (function () {
    function Video(name, url) {
        this.name = name;
        this.url = url;
    }
    return Video;
}());
exports.Video = Video;


/***/ }),

/***/ 948:
/***/ (function(module, exports) {

module.exports = "<div class=\"command-content\" [ngBusy]=\"{busy: busy, message: 'Пожалуйста, подождите...'}\">\r\n\r\n\r\n    <div id=\"photo-content\" class=\"photo-news-content\">\r\n        <div class=\"news-title-photo\">\r\n        </div>\r\n        <div class=\"photo-display\">\r\n            {{videoTitle}}\r\n\r\n            <vg-player>\r\n                <vg-controls>\r\n                    <vg-play-pause></vg-play-pause>\r\n                    <vg-time-display vgProperty=\"current\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                    <vg-scrub-bar>\r\n                        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\r\n                        <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\r\n                    </vg-scrub-bar>\r\n                    <vg-time-display vgProperty=\"total\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                    <vg-mute></vg-mute>\r\n                    <vg-volume></vg-volume>\r\n                    <vg-fullscreen></vg-fullscreen>\r\n                </vg-controls>\r\n                <video #media [vgMedia]=\"media\" id=\"singleVideo\" preload=\"auto\" crossorigin=\"\">\r\n                    <source *ngFor=\"let video of sources\" src='{{video}}' type=\"video/mp4\">\r\n                </video>\r\n            </vg-player>\r\n        </div>\r\n\r\n        <div class=\"photo-filter\">\r\n            <div class=\"filter-title-text\">Выберете период времени</div>\r\n            <form #myForm=\"ngForm\" novalidate class=\"form-date\">\r\n                <my-date-picker class=\"date-ot\" (dateChanged)=\"filterDate($event,1)\" closeSelectorOnDocumentClick=\"true\" name=\"dateTo\" [options]=\"myDatePickerOptions\" [(ngModel)]=\"dateTo\" required></my-date-picker>\r\n                <span>- От</span>\r\n                <my-date-picker (dateChanged)=\"filterDate($event,2)\" name=\"dateEnd\" [options]=\"myDatePickerOptions\" [(ngModel)]=\"dateEnd\" required></my-date-picker>\r\n                <span>- До</span>\r\n            </form>\r\n            <div class=\"filter-title-text-comand\">Выберете команды</div>\r\n            <div class=\"filter-command\">\r\n                <div class=\"command-filter-button\" *ngFor=\"let command of commandFilter; let i = index\">\r\n                    <mat-slide-toggle (change)=\"filterCommand(command.id,$event.checked)\">{{command.name}}</mat-slide-toggle>\r\n                </div>\r\n\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"photo-content\">\r\n            <div *ngFor=\"let video of videos\" class=\"photo-button\" (click)=\"showVideo(video.url, video.name)\" [style.background-image]=\"video.url\">\r\n\r\n                <vg-player>\r\n                    <vg-controls>\r\n                        <vg-play-pause></vg-play-pause>\r\n                        <vg-time-display vgProperty=\"current\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                        <vg-scrub-bar>\r\n                            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\r\n                            <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>\r\n                        </vg-scrub-bar>\r\n                        <vg-time-display vgProperty=\"total\" vgFormat=\"mm:ss\"></vg-time-display>\r\n                        <vg-mute></vg-mute>\r\n                        <vg-volume></vg-volume>\r\n                        <vg-fullscreen></vg-fullscreen>\r\n                    </vg-controls>\r\n                    <video #media [vgMedia]=\"media\" id=\"singleVideo\" preload=\"auto\" crossorigin=\"\">\r\n                        <source src='{{video.url}}' type=\"video/mp4\">\r\n                    </video>\r\n                </vg-player>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 949:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var NewsType = (function () {
    function NewsType() {
    }
    NewsType.prototype.transform = function (value, args) {
        if (value == 1)
            return "текст";
        if (value == 2)
            return "фотоотчет";
        if (value == 3)
            return "видео";
    };
    NewsType = __decorate([
        core_1.Pipe({
            name: 'newsType'
        })
    ], NewsType);
    return NewsType;
}());
exports.NewsType = NewsType;


/***/ }),

/***/ 950:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var TurnamentType = (function () {
    function TurnamentType() {
    }
    TurnamentType.prototype.transform = function (value, args) {
        if (value == 1)
            return "Круговой";
        if (value == 2)
            return "Смешанный";
    };
    TurnamentType = __decorate([
        core_1.Pipe({
            name: 'turnamentType'
        })
    ], TurnamentType);
    return TurnamentType;
}());
exports.TurnamentType = TurnamentType;


/***/ }),

/***/ 951:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var TurnamentStep = (function () {
    function TurnamentStep() {
    }
    TurnamentStep.prototype.transform = function (value, args) {
        if (value == 0)
            return "Редактирование";
        if (value == 1)
            return "Регистрация";
        if (value == 2)
            return "Построение";
        if (value == 3)
            return "В процессе";
        if (value == 4)
            return "Завершен";
    };
    TurnamentStep = __decorate([
        core_1.Pipe({
            name: 'turnamentStep'
        })
    ], TurnamentStep);
    return TurnamentStep;
}());
exports.TurnamentStep = TurnamentStep;


/***/ })

},[871]);
//# sourceMappingURL=app.js.map