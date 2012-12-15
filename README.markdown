# Sench Keypa: A Sencha Touch user extension

Sencha Keypad was originally designed as a log in keypad for a mobile exam system called MobileLink at [BrightLink Technology](http://thebrightlink.com).


## Demo

![Screenshot](http://github.com/msmeeks/sencha-keypad/raw/master/screenshot.png)

Check the [examples.html](http://github.com/msmeeks/sencha-keypad/raw/master/examples.html) for several demos.


## Usage

First, load [Sencha Touch](http://www.sencha.com/products/touch) (v2.1), and the keypad extension:

    <script type="text/javascript" charset="utf-8" src="js/sencha-touch-2.1.0/sencha-touch-all.js"></script>
    <link rel="stylesheet" type="text/css" href="js/sencha-touch-2.1.0/resources/css/sencha-touch.css">
    <script src="js/Keypad.js" type="text/javascript" charset="utf-8"></script>

Next, create an instance of the Keypad widget and render it to some element on the page.
	
    <script>
		Ext.setup({
			onReady: function () {
				var basic = new Ext.ux.Keypad({
                    renderTo: 'keypad'
                });
			}
		});
    </script>

	<div id="keypad"/>

You can also add a keypad to any Sencha container. 

	...
	items:[
		{
			xtype: 'keypad'
		}
	]

There are several other possible configurations and ways to instantiate the widget, so see the **Options** documentation below as well as the [examples page](http://msmeeks.github.com/sencha-keypad/examples.html) which demonstrates most of them.


## Options

Keypad accepts several options to customize the behaviour:

### clearText : String

The button text to be used as the text for the clear button (html tags are accepted).

Defaults to 'Clear'.


### centered : Boolean

True to make the keypad buttons and field centered relative to the rest of the Keypad, false will leave the keypad components "left-aligned".

Defaults to false.


### submitHandler : Function

A function called when the submit button is clicked (can be used instead of the submited event). The handler is passed the following parameters:

*  v : Number
		
	The value entered in the keypad.
*  k : Keypad
		
	This keypad.
*  b : Button
		
	The submit button.
*  e : EventObject
		
	The click event.


### submitParamName : String

The parameter name used for the value when it is submitted using the submittUrl option.

Defaults to 'value'.


### submitText : String

The button text to be used as the text for the submit button (html tags are accepted).

Defaults to 'Submit'.


### submitUrl : String

The url to which the value will be submitted.

If a submitUrl is present, then the submitHandler will not be used, but the submitted event will still be fired.

Defaults to ''.


### ui : String

A set of predefined ui styles for individual components.

Supported options: 'normal', 'small'.

Defaults to 'normal'.

In the current version, Keypad deviates from the standard approach to handling ui options by appending the ui to the baseCls. Future versions may conform to the Sencha approach, or provide a different method to set the size of the widget.

## Events

### submitted

Coming soon.

## Methods

### addDigit( String digit )

Adds digit to the end of the value of the keypad.


### clear()

Clears the value of the keypad.


### getValue()

Returns the value of the keypad.


### setValue( String value )

Sets the value of the keypad.


## Authors

* [Michael S. Meeks](http://github.com/msmeeks) *original author*


## License

sencha-keypad is released under the [MIT license](http://github.com/msmeeks/sencha-keypad/raw/master/LICENSE).

