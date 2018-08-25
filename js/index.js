"use strict"

// emojify returns the corresponding emoji image
function emojify(name) {
	var out = `<img src="emojis/` + name + `.png">`
	return out
}

function cast(emoji) {
	var magic = emojify("magic")
	return function (wizard) {
		return wizard + " " + magic + " " + emoji + " " + magic
	}
}

Vue.component("wizard", {
    props: ["name", "cast"],
    template: `<p v-html="cast(name)"></p>`
})

var app = new Vue({
	el: "#app",
	data: {
		wizard      : "",
		harry       : emojify("harry"      ),
		hedwig      : emojify("hedwig"     ),
		ron         : emojify("ron"        ),
		scabbers    : emojify("scabbers"   ),
		hermione    : emojify("hermione"   ),
		crookshanks : emojify("crookshanks"),
		active: emojify("sirius--man"),
		// sirius is an object that contains two states: man and dog
		sirius: {
			man: emojify("sirius--man"),
			dog: emojify("sirius--dog")
		}
	},
	methods: {
		lumos: cast(emojify("lumos")),
		incendio: cast(emojify("incendio")),
		wizards: function () {
			return [
				{ name: this.harry   , pet: this.hedwig      },
				{ name: this.ron     , pet: this.scabbers    },
				{ name: this.hermione, pet: this.crookshanks }
			]
		},
		// oculus_reparo returns a spell (function) that repairs glasses		
		oculus_reparo: cast(emojify("oculus-reparo")),		
		// wingardium_leviosa returns a spell (function) that levitates an object
		wingardium_leviosa: cast(emojify("wingardium-leviosa")),
		// alohomora returns a spell (function) that unlocks a door
		alohomora: cast(emojify("alohomora")),
		animagus: function () {
			this.active = (
				this.active == this.sirius.man ?
					this.sirius.dog :
					this.sirius.man
			)
		},
		// breathe returns the corresponding .breathe--*
		breathe: function () {
			return (
				this.active == this.sirius.man ?
					"breathe--man" :
					"breathe--dog"
			)
		},
		// background returns the corresponding background
		background: function () {
			return (
				this.active == this.sirius.man ?
					"" :
					"black"
			)
		},
	}
})

app.wizard = app.harry