// Copyright 2002-2013, University of Colorado

/**
 * View container.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define(
  [
    'PHETCOMMON/model/property/Property',
    'PHETCOMMON/view/CanvasQuirks',
    'PHETCOMMON/view/PerformanceMonitor',
    'view/ExampleSimStage',
    'view/ControlPanel',
    'i18n!../../nls/example-sim-strings'
  ],
  function( Property, CanvasQuirks, PerformanceMonitor, ExampleSimStage, ControlPanel, strings ) {
    "use strict";

    function ExampleSimView( imagesLoader, model ) {

      var that = this;

      // browser window title
      $( 'title' ).html( strings.title );

      // canvas
      var canvas = document.getElementById( 'example-sim-canvas' ); //TODO replace with jquery selector
      CanvasQuirks.fixTextCursor( canvas );

      // stage
      this.stage = new ExampleSimStage( imagesLoader, canvas, model );

      // performance monitor
      this.performanceMonitor = new PerformanceMonitor();

      // view-specific properties
      this.performanceMonitorVisible = new Property( true );
      this.performanceMonitorVisible.addObserver( function ( visible ) {
        that.performanceMonitor.setVisible( visible );
      } );

      // control panel
      ControlPanel.init( strings, model, this );
    }

    ExampleSimView.prototype.reset = function() {
      this.performanceMonitorVisible.reset();
      this.stage.reset();
    };

    // Called by the animation loop
    ExampleSimView.prototype.step = function() {
      this.stage.tick();
    };

    return ExampleSimView;
  }
);