(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["@mike_petrov/react-custom-audio-player"] = factory();
	else
		root["@mike_petrov/react-custom-audio-player"] = factory();
})(this, function() {
return webpackJsonp_mike_petrov_react_custom_audio_player([1],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getExtensionFromType"] = getExtensionFromType;
/* harmony export (immutable) */ __webpack_exports__["extractFileName"] = extractFileName;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icons__ = __webpack_require__(7);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var log = console.log.bind(console); //eslint-disable-line
var logError = console.error ? console.error.bind(console) : log; //eslint-disable-line
var logWarning = console.warn ? console.warn.bind(console) : log; //eslint-disable-line

/* converts given number of seconds to standard time display format
 * http://goo.gl/kEvnKn
 */
function convertToTime(number) {
  var mins = Math.floor(number / 60);
  var secs = (number % 60).toFixed();
  return '' + (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
}

/**
*  Convert given time to number
* @returns {Number}
*/
function parseTime(s) {
  // 0:23
  var c = s.split(':'); //0,23
  return parseInt(c[0]) * 60 + parseInt(c[1]); // 23
}

/**
 * Returns true for Internet Explorer and Edge, false otherwise
 * @returns {Boolean}
 */
function isIEBrowser() {
  return navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1 || navigator.userAgent.indexOf('Edge/') > -1;
}

/**
 * Returns the extension based on the passed type
 * @param {String} type The file type
 * @returns {String} The extension of the file
 */
function getExtensionFromType(type) {
  if (type === 'audio/wav') {
    return '.wav';
  } else if (type === 'audio/ogg') {
    return '.ogg';
  } else if (type === 'audio/mpeg') {
    return '.mp3';
  }
  return '';
}

/**
 * Returns the file name with the extension, if any, removed
 * @param {String} filename The name of the file
 * @returns {String} The new file name
 */
function extractFileName(filename) {
  var extensionLength = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).length;
  if (extensionLength) {
    return filename.slice(0, filename.length - extensionLength - 1);
  }
  return filename;
}

/*
 * AudioPlayer
 *
 * Accepts 'src' prop of the form:
 *
 * "./path/to/file.mp3"
 *
 * Accepts 'autoplay' prop (true/[false]).
 *
 * Accepts 'autoplayDelayInSeconds' prop (default 0).
 *
 * Accepts 'disableSeek' prop (default false,
 * disables seeking through the audio if true).
 *
 * Accepts 'cycle' prop (default true,
 * starts playing at the beginning of the playlist
 * when finished if true).
 *
 * Accepts 'style' prop, object, is applied to
 * outermost div (React styles).
 *
 * Accepts 'onMediaEvent' prop, an object used for
 * listening to media events on the underlying audio element.
 *
 * Accepts 'audioElementRef' prop, a function called after
 * the component mounts and before it unmounts with the
 * internally-referenced HTML audio element as its only parameter.
 * Similar to: https://facebook.github.io/react/docs/refs-and-the-dom.html
 */

var AudioPlayer = function (_Component) {
  _inherits(AudioPlayer, _Component);

  function AudioPlayer(props) {
    _classCallCheck(this, AudioPlayer);

    /* true if the user is currently dragging the mouse
     * to seek a new track position
     */
    var _this = _possibleConstructorReturn(this, (AudioPlayer.__proto__ || Object.getPrototypeOf(AudioPlayer)).call(this, props));

    _this.seekInProgress = false;

    _this.defaultState = {
      paused: true,
      loading: !!props.showLoader,
      reload: false,
      /* elapsed time for current track, in seconds -
       * DISPLAY ONLY! the actual elapsed time may
       * not match up if we're currently seeking, since
       * the new time is visually previewed before the
       * audio seeks.
       */
      displayedTime: 0,
      playbackRate: '1x',
      showPlaybackRateList: false,
      volumeRange: props.volumeRange
    };

    _this.state = Object.assign({}, _this.defaultState);

    // html audio element used for playback
    _this.audio = null;
    _this.audioProgressContainer = null;
    /* bounding rectangle used for calculating seek
     * position from mouse/touch coordinates
     */
    _this.audioProgressBoundingRect = null;

    // event listeners to add on mount and remove on unmount
    _this.seekReleaseListener = function (e) {
      return _this.seek(e);
    };
    _this.resizeListener = function () {
      return _this.fetchAudioProgressBoundingRect();
    };
    _this.audioPlayListener = function () {
      return _this.setState({ paused: false, reload: false });
    };
    _this.audioPauseListener = function () {
      return _this.setState({ paused: true });
    };
    _this.audioEndListener = function () {
      if (_this.props.onEnded) {
        _this.props.onEnded();
      }
      _this.setState({ reload: true });
    };
    _this.audioStallListener = function () {
      return _this.togglePause(true);
    };
    _this.audioTimeUpdateListener = function () {
      return _this.handleTimeUpdate();
    };
    _this.audioMetadataLoadedListener = function () {
      return _this.setState({
        activeTrackIndex: _this.currentTrackIndex
      });
    };
    _this.onBuffered = function () {
      _this.setState({ loading: false });
    };

    _this.forward = function () {
      var currentTime = _this.audio.currentTime + 5;
      _this.audio.currentTime = currentTime;
      _this.setState({ displayedTime: currentTime });
    };

    _this.rewind = function () {
      var currentTime = _this.audio.currentTime - 5;
      _this.audio.currentTime = currentTime;
      _this.setState({ displayedTime: currentTime });
    };

    _this.updateVolume = function () {
      _this.audio.volume = _this.state.volumeRange / 100;
    };

    _this.changePlaybackRate = function (speed, display) {
      _this.audio.playbackRate = speed;
      _this.setState({ playbackRate: display, showPlaybackRateList: false });
    };

    _this.togglePlaybackRate = function () {
      return _this.setState({ showPlaybackRateList: !_this.state.showPlaybackRateList });
    };

    _this.changeVolumeRange = function (event) {
      _this.setState({ volumeRange: Number(event.target.value) }, function () {
        _this.updateVolume();
      });
    };

    _this.prevVolumeRange = null;

    _this.toggleVolumeRange = function () {
      if (_this.state.volumeRange) {
        _this.prevVolumeRange = _this.state.volumeRange;
      }
      _this.setState(function (prevState) {
        return {
          volumeRange: prevState.volumeRange === 0 ? _this.prevVolumeRange : 0
        };
      }, function () {
        _this.updateVolume();
      });
    };

    _this.audio = document.createElement('audio');

    _this.downloadAudio = _this.downloadAudio.bind(_this);

    return _this;
  }

  _createClass(AudioPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // add event listeners bound outside the scope of our component
      window.addEventListener('mouseup', this.seekReleaseListener);
      document.addEventListener('touchend', this.seekReleaseListener);
      window.addEventListener('resize', this.resizeListener);
      this.resizeListener();

      var audio = this.audio;

      // add event listeners on the audio element
      audio.preload = 'none';
      audio.loop = this.props.cycle;
      audio.addEventListener('play', this.audioPlayListener);
      audio.addEventListener('pause', this.audioPauseListener);
      audio.addEventListener('ended', this.audioEndListener);
      // audio.addEventListener('stalled', this.audioStallListener);
      audio.addEventListener('timeupdate', this.audioTimeUpdateListener);
      audio.addEventListener('loadedmetadata', this.audioMetadataLoadedListener);
      audio.addEventListener('loadeddata', this.onBuffered);
      this.addMediaEventListeners(this.props.onMediaEvent);

      if (this.props.src) {
        this.updateSource();
        if (this.props.autoplay) {
          var delay = this.props.autoplayDelayInSeconds || 0;
          clearTimeout(this.delayTimeout);
          this.delayTimeout = setTimeout(function () {
            return _this2.togglePause(false);
          }, delay * 1000);
        }
      }

      if (this.props.audioElementRef) {
        this.props.audioElementRef(audio);
      }

      this.updateVolume();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // remove event listeners bound outside the scope of our component
      window.removeEventListener('mouseup', this.seekReleaseListener);
      document.removeEventListener('touchend', this.seekReleaseListener);
      window.removeEventListener('resize', this.resizeListener);

      // remove event listeners on the audio element
      this.audio.removeEventListener('play', this.audioPlayListener);
      this.audio.removeEventListener('pause', this.audioPauseListener);
      this.audio.removeEventListener('ended', this.audioEndListener);
      this.audio.removeEventListener('stalled', this.audioStallListener);
      this.audio.removeEventListener('timeupdate', this.audioTimeUpdateListener);
      this.audio.removeEventListener('loadedmetadata', this.audioMetadataLoadedListener);
      this.audio.addEventListener('loadeddata', this.onBuffered);
      this.getName = this.getName.bind(this);

      this.removeMediaEventListeners(this.props.onMediaEvent);
      clearTimeout(this.gapLengthTimeout);
      clearTimeout(this.delayTimeout);

      // pause the audio element before we unmount
      this.audio.pause();

      if (this.props.audioElementRef) {
        this.props.audioElementRef(this.audio);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (nextProps.volumeRange !== this.state.volumeRange) {
        this.setState({ volumeRange: Number(nextProps.volumeRange) }, function () {
          _this3.updateVolume();
        });
      }

      // Update media event listeners that may have changed
      this.removeMediaEventListeners(this.props.onMediaEvent);
      this.addMediaEventListeners(nextProps.onMediaEvent);

      var newSrc = nextProps.src;
      if (newSrc !== this.props.src || nextProps.showLoader != this.props.showLoader) {
        if (this.audio) {
          this.audio.src = newSrc || '';
        }
        this.setState(this.defaultState);
      }

      if (newSrc && !this.props.src) {
        if (this.props.autoplay) {
          var delay = this.props.autoplayDelayInSeconds || 0;
          clearTimeout(this.delayTimeout);
          this.delayTimeout = setTimeout(function () {
            return _this3.togglePause(false);
          }, delay * 1000);
        }
      }
    }
  }, {
    key: 'addMediaEventListeners',
    value: function addMediaEventListeners(mediaEvents) {
      var _this4 = this;

      if (!mediaEvents) {
        return;
      }
      Object.keys(mediaEvents).forEach(function (type) {
        if (typeof mediaEvents[type] !== 'function') {
          return;
        }
        _this4.audio.addEventListener(type, mediaEvents[type]);
      });
    }
  }, {
    key: 'removeMediaEventListeners',
    value: function removeMediaEventListeners(mediaEvents) {
      var _this5 = this;

      if (!mediaEvents) {
        return;
      }
      Object.keys(mediaEvents).forEach(function (type) {
        if (typeof mediaEvents[type] !== 'function') {
          return;
        }
        _this5.audio.removeEventListener(type, mediaEvents[type]);
      });
    }

    // componentDidUpdate() {
    //    if we loaded a new playlist and reset the current track marker, we
    //    * should load up the first one.

    //   if (this.audio && this.currentTrackIndex === -1) {
    //     this.skipToNextTrack(false);
    //   }
    // }

  }, {
    key: 'togglePause',
    value: function togglePause(value) {
      var _this6 = this;

      if (!this.audio) {
        return;
      }
      var pause = typeof value === 'boolean' ? value : !this.state.paused;
      if (pause && !this.audioPromise) {
        return this.audio.pause();
      }
      if (!this.props.src) {
        return;
      }
      try {
        this.audioPromise = this.audio.play();
        if (this.audio.readyState === 0) {
          this.setState({ loading: true });
        }
        if (this.audioPromise !== undefined) {
          // Little funny logic to avoid this issue https://goo.gl/LdLk22
          this.audioPromise.then(function () {
            _this6.audioPromise = undefined;
          });
        }
      } catch (error) {
        logError(error);
        var warningMessage = 'Audio playback failed at ' + new Date().toLocaleTimeString() + '! (Perhaps autoplay is disabled in this browser.)';
        logWarning(warningMessage);
      }
    }
  }, {
    key: 'updateSource',
    value: function updateSource() {
      this.audio.src = this.props.src;
    }
  }, {
    key: 'fetchAudioProgressBoundingRect',
    value: function fetchAudioProgressBoundingRect() {
      this.audioProgressBoundingRect = this.audioProgressContainer.getBoundingClientRect();
    }
  }, {
    key: 'handleTimeUpdate',
    value: function handleTimeUpdate() {
      if (!this.seekInProgress && this.audio) {
        this.setState({
          displayedTime: this.audio.currentTime
        });
      }
    }
  }, {
    key: 'adjustDisplayedTime',
    value: function adjustDisplayedTime(event) {
      if (!this.props.src || this.props.disableSeek || this.audio.readyState === 0) {
        return;
      }
      // make sure we don't select stuff in the background while seeking
      if (event.type === 'mousedown' || event.type === 'touchstart') {
        this.seekInProgress = true;
        document.body.classList.add('noselect');
      } else if (!this.seekInProgress) {
        return;
      }
      /* we don't want mouse handlers to receive the event
       * after touch handlers if we're seeking.
       */
      event.preventDefault();
      var boundingRect = this.audioProgressBoundingRect;
      var isTouch = event.type.slice(0, 5) === 'touch';
      var pageX = isTouch ? event.targetTouches.item(0).pageX : event.pageX;
      var position = pageX - boundingRect.left - document.body.scrollLeft;
      var containerWidth = boundingRect.width;
      var progressPercentage = position / containerWidth;
      this.setState({
        displayedTime: progressPercentage * this.audio.duration
      });
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this.props.filename ? this.props.type ? extractFileName(this.props.filename) + getExtensionFromType(this.props.type) : this.props.filename : this.props.type ? extractFileName(this.props.src) + getExtensionFromType(this.props.type) : this.props.src;
    }
  }, {
    key: 'downloadAudio',
    value: function downloadAudio() {
      var filename = this.getName();
      if (isIEBrowser()) {
        var blob = new Blob([this.props.src]);
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = this.props.src;
        a.download = filename;
        a.click();
        document.body.removeChild(a);
      }
    }
  }, {
    key: 'seek',
    value: function seek(event) {
      /* this function is activated when the user lets
       * go of the mouse, so if .noselect was applied
       * to the document body, get rid of it.
       */
      document.body.classList.remove('noselect');
      if (!this.seekInProgress) {
        return;
      }
      /* we don't want mouse handlers to receive the event
       * after touch handlers if we're seeking.
       */
      event.preventDefault();
      this.seekInProgress = false;
      var displayedTime = this.state.displayedTime;
      if (isNaN(displayedTime)) {
        return;
      }
      this.audio.currentTime = displayedTime;
    }
  }, {
    key: 'getVolumeSliderBgStyle',
    value: function getVolumeSliderBgStyle() {
      var settings = {
        fill: this.props.theme.progressBarFillColor,
        background: this.props.theme.progressBarColor
      };
      var min = 0;
      var max = 100;
      var percentage = 100 * (this.state.volumeRange - min) / (max - min);
      return 'linear-gradient(90deg, ' + settings.fill + ' ' + percentage + '%, ' + settings.background + ' ' + (percentage + 0.1) + '%)';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var displayedTime = this.state.displayedTime;
      var duration = this.audio && this.audio.duration || 0;

      var elapsedTime = convertToTime(displayedTime);
      var fullTime = convertToTime(duration);
      var timeRatio = elapsedTime + ' ';
      var remainingTime = convertToTime(parseTime(fullTime) - parseTime(timeRatio));

      var progressBarWidth = (displayedTime && duration && displayedTime / duration * 100 || 0) + '%';

      var adjustDisplayedTime = function adjustDisplayedTime(e) {
        return _this7.adjustDisplayedTime(e);
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: _typeof(this.props.theme) === 'object' ? 'custom' : this.props.theme },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { id: 'audio_player', className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('audio_player', { disabled: !this.props.src, dark: this.props.theme.isNotString }), style: { color: this.props.theme.color, background: this.props.theme.backgroundColor } },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'audio_controls' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { id: 'play_pause_button', className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('play_pause_button', 'audio_button', { paused: !this.state.reload && this.state.paused, loading: this.state.loading, reload: this.state.reload }), onClick: function onClick() {
                  return _this7.togglePause();
                } },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'play_pause_inner' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'ivrplaybtn' },
                  this.props.customPlayIcon !== null ? this.props.customPlayIcon : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icons__["a" /* PlayIcon */], null)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'ivrpausebtn' },
                  this.props.customPauseIcon !== null ? this.props.customPauseIcon : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icons__["b" /* PauseIcon */], null)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'spinner' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: 'https://storage.googleapis.com/branddesignmanager/CWANewDesign/images/spinners.gif' })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'reload-icon' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icons__["c" /* ReloadIcon */], null),
                  ' '
                )
              )
            )
          ),
          this.props.showSeekControls && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: "btn " + (this.state.reload ? 'disabled' : '') },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'i',
              { className: 'button', onClick: this.rewind },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icons__["d" /* BackwardIcon */], null)
            )
          ),
          this.props.showSeekControls && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: "btn " + (this.state.reload ? 'disabled' : '') },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'i',
              { className: 'button', onClick: this.forward },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icons__["e" /* ForwardIcon */], null)
            )
          ),
          this.props.showRunningTimer && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { id: 'audio_time_progress', className: 'audio_time_progress noselect', draggable: 'false', style: { color: this.props.theme.color } },
            ' ',
            timeRatio
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { id: 'audio_progress_container', className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()("audio_progress_container", { disabled: this.audio && this.audio.readyState < 3 }), ref: function ref(_ref) {
                return _this7.audioProgressContainer = _ref;
              }, onMouseDown: adjustDisplayedTime, onMouseMove: adjustDisplayedTime, onTouchStart: adjustDisplayedTime, onTouchMove: adjustDisplayedTime, style: { background: this.props.theme.progressBarColor } },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { id: 'audio_progress', className: 'audio_progress', style: { width: progressBarWidth, background: this.props.theme.progressBarFillColor } },
              ' ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('code', null)
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { id: 'audio_progress_overlay', className: 'audio_progress_overlay' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'audio_info_marquee' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { id: 'audio_info', className: 'audio_info noselect', draggable: 'false' },
                  'Test'
                )
              )
            )
          ),
          this.props.showFullDuration && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { draggable: 'false', className: 'audio_time_progress noselect remaining-time', style: { color: this.props.theme.color } },
            fullTime
          ),
          this.props.showRemainingTime && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { draggable: 'false', className: 'audio_time_progress noselect', style: { color: this.props.theme.color } },
            remainingTime
          ),
          this.props.showVolumeSlider && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { draggable: 'false', className: 'volume-wrapper' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              { onClick: this.toggleVolumeRange, className: 'audio_button volume-button' },
              this.state.volumeRange !== 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icons__["f" /* VolumeIcon */], null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icons__["g" /* MutedIcon */], null)
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { ref: function ref(ele) {
                _this7.range = ele;
              }, className: 'range-slider', style: { background: this.getVolumeSliderBgStyle() }, value: this.state.volumeRange, type: 'range', min: '0', max: '100', onInput: this.changeVolumeRange, onChange: this.changeVolumeRange })
          ),
          this.props.showPlaybackRate && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'player-speed-control dropdown-field ft-left ' + (this.state.showPlaybackRateList ? 'open' : '') },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'dropdown-button' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { className: 'button nostyle', onClick: this.togglePlaybackRate, style: { color: this.props.theme.color } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  null,
                  this.state.playbackRate,
                  ' '
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'drop-arrow' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'dropdownmenu bottom' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'ul',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  { onClick: function onClick() {
                      _this7.changePlaybackRate('1', '1x');
                    } },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { style: { color: this.props.theme.color } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('code', { className: 'brand-bg' }),
                    '1x'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  { onClick: function onClick() {
                      _this7.changePlaybackRate('1.5', '1.5x');
                    } },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { style: { color: this.props.theme.color } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('code', { className: 'brand-bg' }),
                    '1.5x'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  { onClick: function onClick() {
                      _this7.changePlaybackRate('2', '2x');
                    } },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { style: { color: this.props.theme.color } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('code', { className: 'brand-bg' }),
                    '2x'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'li',
                  { onClick: function onClick() {
                      _this7.changePlaybackRate('3', '3x');
                    } },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { style: { color: this.props.theme.color } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('code', { className: 'brand-bg' }),
                    '3x'
                  )
                )
              )
            )
          ),
          this.props.enableDownload && this.props.customDownloadButton && this.props.children ? this.props.children : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'btn' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'i',
              { className: 'button', onClick: this.downloadAudio },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icons__["h" /* DownloadIcon */], null)
            )
          )
        )
      );
    }
  }]);

  return AudioPlayer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (AudioPlayer);


AudioPlayer.propTypes = {
  src: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  autoplay: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  autoplayDelayInSeconds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  cycle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  disableSeek: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  // style: PropTypes.object,
  onMediaEvent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  audioElementRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  showLoader: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showSeekControls: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showPlaybackRate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  enableDownload: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showRunningTimer: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showFullDuration: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showRemainingTime: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  showVolumeSlider: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  volumeRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  customPlayIcon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  customPauseIcon: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  customDownloadButton: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['audio/wav', 'audio/ogg', 'audio/mpeg', '']),
  onEnded: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  filename: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  theme: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    backgroundColor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    progressBarColor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    progressBarFillColor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  })])
};

AudioPlayer.defaultProps = {
  cycle: false,
  showLoader: false,
  showSeekControls: false,
  enableDownload: true,
  showRunningTimer: false,
  showFullDuration: false,
  showRemainingTime: false,
  showVolumeSlider: false,
  volumeRange: 50,
  customPlayIcon: null,
  customPauseIcon: null,
  showPlaybackRate: false,
  customDownloadButton: false,
  type: '',
  filename: '',
  children: undefined,
  theme: {
    progressBarColor: '#e6e9f0',
    progressBarFillColor: '#6699ff'
  }
};

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PauseIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return DownloadIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ReloadIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BackwardIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ForwardIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return VolumeIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return MutedIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var PlayIcon = function PlayIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { width: "14px", height: "18px", viewBox: "0 0 14 18", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                { id: "play", fill: "#181818", fillRule: "nonzero" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M13.562,8.1 L1.87,0.225 C1.052,-0.337 0,0.225 0,1.125 L0,16.875 C0,17.775 1.052,18.337 1.87,17.775 L13.563,9.9 C14.147,9.45 14.147,8.55 13.563,8.1 L13.562,8.1 Z", id: "Path" })
            )
        )
    );
};

var PauseIcon = function PauseIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { width: "14px", height: "16px", viewBox: "0 0 14 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                { id: "Group", fill: "#181818", fillRule: "nonzero" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M4,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L4,16 C4.6,16 5,15.6 5,15 L5,1 C5,0.4 4.6,0 4,0 Z M10,0 C9.4,0 9,0.4 9,1 L9,15 C9,15.6 9.4,16 10,16 L13,16 C13.6,16 14,15.6 14,15 L14,1 C14,0.4 13.6,0 13,0 L10,0 Z", id: "Shape" })
            )
        )
    );
};

var DownloadIcon = function DownloadIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { width: "14px", height: "13px", viewBox: "0 0 14 13", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                { transform: "translate(-884.000000, -17.000000)", fill: "#767F86" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "g",
                    { transform: "translate(868.000000, 0.000000)" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M28.3749705,24.2500089 C28.6874696,24.2500089 28.9530942,24.3593838 29.1718436,24.5781332 C29.390593,24.7968825 29.4999678,25.0625071 29.4999678,25.3750063 L29.4999678,28.3749991 C29.4999678,28.6874982 29.390593,28.9531228 29.1718436,29.1718722 C28.9530942,29.3906216 28.6874696,29.4999964 28.3749705,29.4999964 L17.1249973,29.4999964 C16.8124982,29.4999964 16.5468736,29.3906216 16.3281242,29.1718722 C16.1093749,28.9531228 16,28.6874982 16,28.3749991 L16,25.3750063 C16,25.0625071 16.1093749,24.7968825 16.3281242,24.5781332 C16.5468736,24.3593838 16.8124982,24.2500089 17.1249973,24.2500089 L19.2812422,24.2500089 L18.2031197,23.1718865 C17.9843704,22.9375121 17.8789019,22.6679815 17.8867143,22.3632947 C17.8945266,22.0586079 18.0039015,21.7968897 18.2148385,21.5781403 C18.4257755,21.359391 18.6874937,21.2500161 18.9999928,21.2500161 L20.4999893,21.2500161 L20.4999893,18.6250224 C20.4999893,18.3125232 20.6093641,18.0468986 20.8281135,17.8281493 C21.0468628,17.6093999 21.3124875,17.500025 21.6249866,17.500025 L23.8749812,17.500025 C24.1874804,17.500025 24.453105,17.6093999 24.6718543,17.8281493 C24.8906037,18.0468986 24.9999785,18.3125232 24.9999785,18.6250224 L24.9999785,21.2500161 L26.499975,21.2500161 C26.8280992,21.2500161 27.0976298,21.359391 27.3085668,21.5781403 C27.5195038,21.7968897 27.6288786,22.0586079 27.636691,22.3632947 C27.6445034,22.6679815 27.5312225,22.9375121 27.2968481,23.1718865 L26.2187256,24.2500089 L28.3749705,24.2500089 Z M18.9999928,22.3750134 L22.7499839,26.1250045 L26.499975,22.3750134 L23.8749812,22.3750134 L23.8749812,18.6250224 L21.6249866,18.6250224 L21.6249866,22.3750134 L18.9999928,22.3750134 Z M28.3749705,28.3749991 L28.3749705,25.3750063 L25.0937283,25.3750063 L23.546857,26.9218776 C23.3281076,27.1406269 23.062483,27.2500018 22.7499839,27.2500018 C22.4374848,27.2500018 22.1718602,27.1406269 21.9531108,26.9218776 L20.4062395,25.3750063 L17.1249973,25.3750063 L17.1249973,28.3749991 L28.3749705,28.3749991 Z M26.3124754,26.8750027 C26.3124754,26.7187529 26.3671627,26.585941 26.4765375,26.4765661 C26.5859124,26.3671913 26.7187243,26.312504 26.8749741,26.312504 C27.0312238,26.312504 27.1640358,26.3671913 27.2734106,26.4765661 C27.3827855,26.585941 27.4374727,26.7187529 27.4374727,26.8750027 C27.4374727,27.0312524 27.3827855,27.1640644 27.2734106,27.2734392 C27.1640358,27.3828141 27.0312238,27.4375013 26.8749741,27.4375013 C26.7187243,27.4375013 26.5859124,27.3828141 26.4765375,27.2734392 C26.3671627,27.1640644 26.3124754,27.0312524 26.3124754,26.8750027 Z" })
                )
            )
        )
    );
};

var ReloadIcon = function ReloadIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { width: "16px", height: "16px", viewBox: "0 0 17 17", version: "1.1" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "defs",
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M10,21 C8.89742857,21 8,20.1028571 8,19 C8,17.8971429 8.89742857,17 10,17 C11.1025714,17 12,17.8971429 12,19 C12,20.1028571 11.1025714,21 10,21 Z", id: "path-1" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { id: "Messages", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                { id: "Messages-V2", transform: "translate(-973.000000, -248.000000)", fillRule: "nonzero" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "g",
                    { id: "Replay-Icon", transform: "translate(969.000000, 244.000000)" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M7.02419728,11.4574669 C7.2984025,8.3979809 9.86916203,6 13,6 C16.3137085,6 19,8.6862915 19,12 C19,15.3137085 16.3137085,18 13,18 L13,20 C17.418278,20 21,16.418278 21,12 C21,7.581722 17.418278,4 13,4 C8.76405539,4 5.29704552,7.29220101 5.01810658,11.4574669 L3.80875019,11.4574669 C3.34987948,11.4574669 3.08783403,11.9815578 3.36327292,12.3478391 L5.58949463,15.3159406 C5.81194211,15.6129254 6.25741938,15.6135078 6.47986685,15.3165229 L8.70608857,12.3484214 C8.98152746,11.9809754 8.719482,11.4580492 8.26119362,11.4574669 L7.02419728,11.4574669 Z", id: "Combined-Shape", fill: "#3B4752", transform: "translate(12.125420, 12.000000) rotate(30.000000) translate(-12.125420, -12.000000) " })
                )
            )
        )
    );
};

var BackwardIcon = function BackwardIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { width: "17px", height: "16px", viewBox: "0 0 17 16", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                { transform: "translate(-56.000000, -16.000000)", fill: "#767F86" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "g",
                    { transform: "translate(42.000000, 0.000000)" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "g",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "g",
                            { transform: "translate(15.000000, 16.000000)" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M14.7660006,2.24910475 L14.7660006,6.73817374 C14.7660006,6.83784001 14.7318755,6.92255678 14.6636258,6.99232313 C14.5953761,7.06208947 14.512501,7.09697287 14.4150014,7.09697287 L10.2978377,7.09697287 C9.88428689,7.09697287 9.54903772,6.7617237 9.54903772,6.34817289 C9.54903772,6.34010551 9.54916809,6.33203866 9.54942879,6.32397549 L9.56604733,5.80997559 C9.57940102,5.39695513 9.92481396,5.0728291 10.3378485,5.08573849 L11.5485083,5.12357763 C11.0805094,4.40597936 10.4711361,3.83788072 9.72038772,3.41928173 C8.96963938,3.00068274 8.15551649,2.79138325 7.2780186,2.79138325 C6.34202085,2.79138325 5.47914793,3.0255992 4.68939983,3.49403155 C3.89965174,3.96246391 3.27565339,4.60032889 2.81740434,5.40762694 C2.3591553,6.214925 2.130031,7.09697287 2.130031,8.05377057 C2.130031,9.01056827 2.3591553,9.89261614 2.81740434,10.6999142 C3.27565339,11.5072123 3.89965174,12.1450772 4.68939983,12.6135096 C5.47914793,13.0819419 6.34202085,13.3161579 7.2780186,13.3161579 C7.92151705,13.3161579 8.53576557,13.2015417 9.12076416,12.9723087 C9.70576275,12.7430758 10.2225117,12.4191601 10.6710104,12.0005611 C10.7490104,11.9407612 10.831885,11.9108613 10.9196348,11.9108613 C11.0073846,11.9108613 11.0902593,11.9507277 11.1682592,12.030461 L12.1627568,13.0470585 C12.2212567,13.1068584 12.2505066,13.1915747 12.2505066,13.3012079 C12.2505066,13.4108412 12.2115069,13.4955575 12.1335069,13.5553573 C11.4900085,14.1533559 10.7490104,14.6217882 9.91051226,14.9606539 C9.07201413,15.2995196 8.19451624,15.4689527 7.2780186,15.4689527 C5.9715216,15.4689527 4.76252466,15.13507 3.65102734,14.4673051 C2.53953001,13.7995402 1.65715699,12.9025424 1.00390871,11.7763116 C0.350660434,10.6500808 0.0240360718,9.41421729 0.0240360718,8.06872053 C0.0240360718,6.72322378 0.350660434,5.48237676 1.00390871,4.3461795 C1.65715699,3.20998224 2.53953001,2.30800092 3.65102734,1.64023602 C4.76252466,0.972471112 5.9715216,0.638588431 7.2780186,0.638588431 C8.37001582,0.638588431 9.39376335,0.867821364 10.3492612,1.32628677 C11.304759,1.78475218 12.1237571,2.42261762 12.8062553,3.23988217 L12.7607661,2.28663034 C12.7410538,1.8735496 13.059942,1.52270157 13.4730228,1.50298934 C13.4840126,1.5024649 13.4950127,1.50218275 13.506015,1.50214308 L14.0145007,1.50030964 C14.4280488,1.49881851 14.7645046,1.83285671 14.7659957,2.24640483 C14.7659989,2.2473048 14.7660006,2.24820477 14.7660006,2.24910475 Z", id: "\uF01E", stroke: "#FFFFFF", strokeWidth: "0.8", transform: "translate(7.395018, 8.053771) scale(-1, 1) translate(-7.395018, -8.053771) " }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M7.69284371,7.27946262 C7.9122198,7.27946262 8.09624921,7.29652495 8.24493745,7.33065012 L8.37290619,7.35624387 L8.27418744,6.30690014 L6.36562499,6.30690014 L6.36562499,5.34896267 L9.26503117,5.34896267 L9.46612492,8.07286885 L9.01640618,8.31418134 C8.91890569,8.2849312 8.79215696,8.2575096 8.63615619,8.23191572 C8.48015541,8.20632184 8.33756309,8.1935251 8.20837495,8.1935251 C7.49418389,8.1935251 7.13709372,8.46286615 7.13709372,9.00155633 C7.13709372,9.56705914 7.48199651,9.84980631 8.17181245,9.84980631 C8.40093859,9.84980631 8.64346741,9.81750976 8.89940618,9.75291568 C9.15534495,9.68832161 9.3795927,9.60483808 9.57215616,9.50246257 L9.57215616,10.4786813 C9.20652934,10.6712447 8.72634666,10.767525 8.1315937,10.767525 C7.44665279,10.767525 6.92015807,10.6066516 6.55209374,10.2849 C6.18402941,9.96314845 6,9.5036843 6,8.90649383 C6,8.40192882 6.15295159,8.0046203 6.45885936,7.71455636 C6.76476714,7.42449242 7.17609114,7.27946262 7.69284371,7.27946262 Z", id: "5", transform: "translate(7.786078, 8.058244) scale(-1, 1) translate(-7.786078, -8.058244) " })
                        )
                    )
                )
            )
        )
    );
};

var ForwardIcon = function ForwardIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { width: "17px", height: "17px", viewBox: "0 0 17 17", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                { transform: "translate(-101.000000, -16.000000)", fill: "#767F86" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "g",
                    { transform: "translate(42.000000, 0.000000)" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "g",
                        { transform: "translate(44.000000, 0.000000)" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "g",
                            { transform: "translate(16.000000, 17.000000)" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M14.7419631,1.61051617 L14.7419631,6.09958475 C14.7419631,6.19925101 14.7078381,6.28396777 14.6395884,6.35373411 C14.5713387,6.42350045 14.4884636,6.45838385 14.390964,6.45838385 L10.2738007,6.45838385 C9.86024991,6.45838385 9.52500077,6.12313471 9.52500077,5.70958394 C9.52500077,5.70151656 9.52513115,5.69344971 9.52539184,5.68538654 L9.54201038,5.17138669 C9.55536407,4.75836627 9.90077698,4.43424026 10.3138115,4.44714965 L11.5244712,4.48498879 C11.0564724,3.76739058 10.447099,3.199292 9.69635076,2.78069305 C8.94560248,2.36209409 8.13147967,2.15279462 7.25398186,2.15279462 C6.3179842,2.15279462 5.45511136,2.38701055 4.66536333,2.85544286 C3.87561531,3.32387517 3.25161702,3.96174009 2.79336802,4.76903808 C2.33511901,5.57633606 2.10599473,6.45838385 2.10599473,7.41518146 C2.10599473,8.37197907 2.33511901,9.25402686 2.79336802,10.0613248 C3.25161702,10.8686228 3.87561531,11.5064877 4.66536333,11.9749201 C5.45511136,12.4433524 6.3179842,12.6775683 7.25398186,12.6775683 C7.89748025,12.6775683 8.51172872,12.5629521 9.09672726,12.3337192 C9.68172579,12.1044862 10.1984746,11.7805705 10.6469734,11.3619716 C10.7249733,11.3021717 10.807848,11.2722718 10.8955978,11.2722718 C10.9833475,11.2722718 11.0662222,11.3121382 11.1442221,11.3918715 L12.1387196,12.408469 C12.1972195,12.4682688 12.2264694,12.5529851 12.2264694,12.6626183 C12.2264694,12.7722516 12.1874697,12.8569679 12.1094697,12.9167677 C11.4659713,13.5147662 10.7249733,13.9831985 9.88647528,14.3220642 C9.04797723,14.6609299 8.17047942,14.8303629 7.25398186,14.8303629 C5.94748498,14.8303629 4.73848815,14.4964803 3.62699093,13.8287154 C2.51549371,13.1609506 1.63312077,12.2639528 0.97987255,11.1377222 C0.326624332,10.0114915 0,8.77562806 0,7.43013142 C0,6.08463479 0.326624332,4.84378789 0.97987255,3.70759073 C1.63312077,2.57139357 2.51549371,1.66941234 3.62699093,1.0016475 C4.73848815,0.333882651 5.94748498,-1.42108547e-14 7.25398186,-1.42108547e-14 C8.34597898,-1.42108547e-14 9.36972642,0.229232912 10.3252242,0.687698281 C11.2807219,1.14616365 12.0997199,1.78402902 12.782218,2.6012935 L12.7367288,1.64804176 C12.7170166,1.23496105 13.0359048,0.884113059 13.4489855,0.86440083 C13.4599753,0.863876393 13.4709754,0.863594237 13.4819777,0.863554566 L13.9904633,0.861721126 C14.4040114,0.860230002 14.7404671,1.19426817 14.7419583,1.60781625 C14.7419615,1.60871622 14.7419631,1.6096162 14.7419631,1.61051617 Z", id: "\uF01E", stroke: "#FFFFFF", strokeWidth: "0.8" }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M7.48653663,6.27946261 C8.00328915,6.27946261 8.41461312,6.4244924 8.72052086,6.71455631 C9.02642861,7.00462023 9.17938018,7.40192871 9.17938018,7.90649367 C9.17938018,8.50368409 8.9953508,8.96314819 8.6272865,9.28489976 C8.2592222,9.60665134 7.73272753,9.76752471 7.04778668,9.76752471 C6.45303378,9.76752471 5.97285113,9.67124443 5.60722435,9.47868099 L5.60722435,8.50246235 C5.79978779,8.60483785 6.02403552,8.68832139 6.27997427,8.75291545 C6.53591302,8.81750952 6.77844182,8.84980606 7.00756794,8.84980606 C7.6973838,8.84980606 8.04228657,8.56705892 8.04228657,8.00155616 C8.04228657,7.46286603 7.68519643,7.19352501 6.97100544,7.19352501 C6.84181731,7.19352501 6.699225,7.20632175 6.54322424,7.23191563 C6.38722348,7.2575095 6.26047476,7.2849311 6.16297428,7.31418124 L5.71325559,7.07286877 L5.91434931,4.34896284 L8.81375523,4.34896284 L8.81375523,5.30690023 L6.90519295,5.30690023 L6.80647421,6.35624385 L6.93444294,6.33065011 C7.08313117,6.29652494 7.26716056,6.27946261 7.48653663,6.27946261 Z", id: "5" })
                        )
                    )
                )
            )
        )
    );
};
var VolumeIcon = function VolumeIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { width: "18px", height: "14px", viewBox: "0 0 18 14", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                { id: "Group", fill: "#181818", fillRule: "nonzero" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M15.6,1.3 C15.2,0.9 14.6,0.9 14.2,1.3 C13.8,1.7 13.8,2.3 14.2,2.7 C15.4,3.9 16,5.4 16,7 C16,8.6 15.4,10.1 14.2,11.3 C13.8,11.7 13.8,12.3 14.2,12.7 C14.4,12.9 14.7,13 14.9,13 C15.2,13 15.4,12.9 15.6,12.7 C17.1,11.2 18,9.2 18,7 C18,4.8 17.1,2.8 15.6,1.3 Z", id: "Path" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M11.282,3.282 C11.1020086,3.4535526 11.0001499,3.69134922 11.0001499,3.94 C11.0001499,4.18865078 11.1020086,4.4264474 11.282,4.598 C12.017,5.333 12.277,6.056 12.277,7 C12.277,7.936 11.852,8.917 11.282,9.487 C11.1020086,9.6585526 11.0001499,9.89634922 11.0001499,10.145 C11.0001499,10.3936508 11.1020086,10.6314474 11.282,10.803 C11.427,10.948 11.918,11.065 12.3,10.959 C12.4101893,10.9310805 12.5122697,10.8776424 12.598,10.803 C13.773,9.733 14.13,8.16 14.13,7 C14.13,6.83 14.128,6.66 14.119,6.49 C14.066,5.498 13.8,4.485 12.597,3.282 C12.4254474,3.10200857 12.1876508,3.0001499 11.939,3.0001499 C11.6903492,3.0001499 11.4525526,3.10200857 11.281,3.282 L11.282,3.282 Z M3.786,4.008 L0.714,4.008 C0.286,4.008 0,4.31 0,4.76 L0,9.272 C0,9.724 0.286,10.024 0.714,10.024 L3.786,10.024 L7.857,13.882 C8.357,14.182 9,13.882 9,13.28 L9,0.752 C9,0.151 8.357,-0.225 7.857,0.151 L3.786,4.008 Z", id: "Shape" })
            )
        )
    );
};

var MutedIcon = function MutedIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { width: "18px", height: "14px", viewBox: "0 0 18 14", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { id: "Page-1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                { id: "Group", fill: "#181818", fillRule: "nonzero" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M12.4,10.5 L14.5,8.4 L16.6,10.5 L18,9.1 L15.9,7 L18,4.9 L16.6,3.5 L14.5,5.6 L12.4,3.5 L11,4.9 L13.1,7 L11,9.1 L12.4,10.5 Z M3.786,4.008 L0.714,4.008 C0.286,4.008 0,4.31 0,4.76 L0,9.272 C0,9.724 0.286,10.024 0.714,10.024 L3.786,10.024 L7.857,13.882 C8.357,14.182 9,13.882 9,13.28 L9,0.752 C9,0.151 8.357,-0.225 7.857,0.151 L3.786,4.008 Z", id: "Shape" })
            )
        )
    );
};

/***/ })

},[10]);
});