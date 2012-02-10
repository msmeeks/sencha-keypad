Ext.namespace('Ext.ux');

Ext.ux.Keypad = function(config) {
	config = config || {};

	config.xtype = 'keypad';
	config.draggable = false;
	config.scroll = false;
	config.ui = config.ui || 'normal';

	var width = 500;
	var height = 650;
	var button_ui = 'action';
	var key_style = 'font-size:27pt;margin:5px;';
	if (config.ui == 'small'){
		width = 300;
		height = 350;
		button_ui = 'confirm-small';
		key_style = 'font-size:20pt;margin:5px;';
	}

	this.createDigitKey = function(digit) {
		return {
			xtype: 'button',
			text: digit,
			handler: function(){
				this.addDigit(digit);
			}, scope: this
		}
	};

	this.keypad_display = new Ext.form.Text({
		id: 'keypad_value',
		disabled: true,
		value: ''
	});

	this.submit_button = new Ext.Button({
		text: config.submitText || 'Submit',
		ui: button_ui,
		handler: function(b, e) {
			if (config.submitUrl) {
				var params = {};
				params[config.submitParamName || 'value'] = this.getValue();

				Ext.Ajax.request({
					url: config.submitUrl,
					params: params,
					success: function(response, opts){
						var data = Ext.util.JSON.decode(response.responseText);
						if (data.success && data.redirect_url) {
							window.location.href = data.redirect_url;
						} else {
							alert(data.msg);
						}
					},
					failure: function(response, opts){
						var data = Ext.util.JSON.decode(response.responseText);
						var message = data.msg || 'There was an error submitting the input.';

						Ext.ux.MessageBox.alert('Error',message);
					},
					scope: this
				});
			} else if (config.submitHandler) {
				config.submitHandler(this.getValue(), this, b, e);
			} else {
				Ext.Msg.alert('No submission action specified','value: ' + this.getValue());
			}
		},
		scope: this
	});

	this.title_bar = {};
	if (config.title){
		this.title_bar = {
			dock: 'top',
			xtype: 'toolbar',
			title: config.title
		};
	}

	this.keypad_panel = new Ext.Panel({
		title: 'Panel',
		id: 'keypad_panel',
		width:width,
		height:height,
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'stretch'
		},
		defaults: {
			layout: 'hbox',
			align: 'stretch',
			flex:1,
			defaults: {
				style:key_style,
				flex:1
			}
		},
		dockedItems: [this.title_bar],
		items: [{
			items: [this.keypad_display]
		},{
			items: [this.createDigitKey('1'), this.createDigitKey('2'), this.createDigitKey('3')]
		}, {
			items: [this.createDigitKey('4'), this.createDigitKey('5'), this.createDigitKey('6')]
		}, {
			items: [this.createDigitKey('7'), this.createDigitKey('8'), this.createDigitKey('9')]
		}, {
			items: [{},this.createDigitKey('0'),{},]
		}, {
			items: [{
				xtype: 'button',
				ui: button_ui,
				text: config.clearText || 'Clear',
				handler: function(){
					this.clear()
				},scope:this
			}, 
				this.submit_button
			]
		}]
	});

	if (config.centered){
		config.layout = {type:'hbox', pack:'center'};
	}
	config.height = height;

	Ext.apply(this, config);

	Ext.ux.Keypad.superclass.constructor.call(this, config);
	this.add( this.keypad_panel );
	this.on('afterrender', function(){this.doLayout();},this);
}

Ext.extend(Ext.ux.Keypad, Ext.Panel, {
	addDigit: function(digit) {
		this.setValue(this.keypad_display.value + digit);
	},

	clear: function() {
		this.keypad_display.setValue('');
	},

	setValue: function(value) {
		this.keypad_display.setValue(value);
	},

	getValue: function() {
		return this.keypad_display.getValue();
	}
});

Ext.reg('keypad', Ext.ux.Keypad);
