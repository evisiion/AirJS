	/*

	Air JS
	------
	
	Air JS makes web application 
	development more realistic, organized, 
	and clean. It's a single blueprint for
	the whole app. A command center where
	you can build the app from the ground 
	up, or call on resources that you've 
	already built.
	
	Why "Air"?
	
	Air JS is named for its light weight
	and "wireless" nature.
	
	Sky JS objects that utilize each-other 
	will dynamically locate and utilize the
	information "wireless", without the 
	developer having to pass objects and 
	information through parameters.
	
	In promoting a wireless, dynamic, very 
	Object-Oriented application design, 
	Air JS helps the developer keep large,
	complex engines organized into separate,
	categorized parts that work together 
	in a de-coupled way.
	
	Client and Server Air JS feature the
	following native primary prototypes:
	
		[]
	
	Client Air JS features the following 
	native primary prototypes:
	
		[resourceList]:
		
		A list of resources to be loaded 
		on command.
		
		[document]:
		
		A dynamic front-end html generator 
		allowing the developer to neatly
		create and control the app's front 
		end via a JS interface. The document
		object is explicitly intended to 
		generate and control the page 
		entirely. For selective insertion 
		within a pre-created page, use the 
		model object. Any changes to the
		document object will immediately be
		reflected onto the page. 
		
		[model]:
		
	Air JS's Facilitated Patterns
	-----------------------------
	
	The Observer Pattern:
	
		The Observer is a design pattern where 
		an object (known as a subject) 
		maintains a list of objects depending 
		on it (observers), automatically 
		notifying them of any changes to state.
		
	Dependency Injection:
	
		Dependency injection is a software 
		design pattern that implements inversion 
		of control and allows a program design 
		to follow the dependency inversion 
		principle.
	
	Single Function Function:
	
		Instead of having a huge mess of callback 
		hell, keep a single function to a single 
		task, and do that task well. Sometimes you 
		can get ahead of yourself and add more 
		functionality within each function, but ask 
		yourself: Can this become an independent 
		function?
	

	*/

var App = new AirJS();

	/* 
	
	Air JS's Document Generator
	---------------------------

	When developing client side web apps,
	the DOM often needs to change often.
	By giving the DOM an OOP control 
	interface, within the script, we can 
	more neatly generate and control the 
	dynamic front end.
	
	*/

App.Resources = new resourceList({

	/*

	Resources such as style sheets, 
	scripts, and libraries, can be gathered 
	via the Resources object with resource 
	constructs.
	
	Each resource as well as the main 
	Resources object, has a load() method. 
	Once resources are gathered, they can 
	be loaded individually via their 
	respective load() methods:
	
		App.Resources.name.load()
	
	or collectively via the main Resources 
	object's load() method:
	
		App.Resources.load()
	
	Both individual resource objects and 
	the main Resources object return the 
	html form of their resource, so if you 
	prefer, you can call the resources by 
	inserting them into the head of the 
	Document object with an html constructor, 
	as described later.
	
	The resourceList object is a simple way 
	to collect large lists of resources for 
	pre-loading (think image gallery) or 
	sequential, event-driven loading (think
	bigger image gallery), or simply to 
	neatly gather the page's necessary resources 
	to be passed to the document object's head.
	
	*/

	"JQuery" 	: new javascript("link.js"),
	"Bluebird" 	: new javascript("link.js"),
	"Style" 	: new css("style.css")

});

App.Document = new document({

	/*

	The DOM can be generated with JS!
	Simply create an empty index html file
	and append:
	
		<script src="Air.js"></script>
		<script src="App_Name.js"></script>
	
	The Document object will convert
	its contents into elements, generating 
	your entire page. This way, you can
	develop very dynamic interfaces quickly 
	either with raw JS, or save separate 
	HTML files remotely and load them in and 
	out easily.
	
	The Document object  expects two direct 
	children types:
	
		head
		body

	Body, head, and children objects expect 
	properties in the form of element 
	constructs or element objects:
	
		script
		link
		div
		span
		img		or 	image
		p		or 	paragraph
		a		or	pagelink
		[...]

	Element objects are inserted into the 
	document as tag sets, with sub-properties 
	being treated as attributes:

		src
		attr
		href
		data*
		class
		id
		style
		placeholder
		[...]
	
	Pre-created HTML modules and embeds 
	can be inserted via the html object.
	The HTML object accepts either links 
	to HTML or html strings.
	
	Loops can be used to generate lists
	of html.

	*/

	Head : new head({

		resources 	: new html(App.Resources),
		favicon 	: new link({
		
			rel 	: "icon",
			type 	: "image/png",
			href 	: "link.icon"'
			
		})
		
	}),

	Body : new body({

		// Use the div constructor to dynamically generate a div
		header : new div({

			// Use the class attribute to assign a class to the div
			class : "header",
			
			// Use the children attribute to assign children to the element
			children : {
				
				
				logo : new div({

					class 	: "logo",
					text	: "Logo Text",
					style	: "color: gray"
				
				})

			}

		}),
		body : new div({
			
			class 		: "app_body",
			children	: {
			
				// Link to an html module that you've prepared separately
				image_gallery	: new html("modules/gallery.html"),
			
				// Use Air.JS GenList Tool to quickly generate list items stored in an array of html strings. 
				service_list	: new html(App.Tools.GenList(ServiceList))
				
			}
		
		}),
		footer : new div({

			title : new h1({
			
				class 	: "map_title", 
				text 	: "Google Map", 
				style 	: "color:gray" 
				
			}),
			google_map : new html("<embed code>")

		})

	})

});

App.Models.ChatRoom = new model({
	
	/*

	Generate or load HTML models to use
	later. You don't have to store your
	models in the App.Models object, but 
	by storing them there, you'll keep
	your variables neatly organized.

	*/
	
	chat_wrapper :  new div({
	
		class : "chat_wrapper",
		children : {
		
			// design children
		
		}
	
	}),
	
	chat_ad : new html("<embed code>");
	
});

App.Document.insert(App.Models.ChatRoom, Document.Body.body, "within");

	/* 
	
	Insert modules into the DOM at any 
	time with the Document object's 
	insert() method, or load them on 
	document load by including them as 
	the value of an html constructor 
	in the Document object.
	
	The insert() method expects a model 
	object or a string as the elements 
	being inserted:
	
		App.Models.ChatRoom
		"<p>This is a short paragraph</p>"
	
	As its second parameter, the insert()
	method expects an element object as 
	the target of insertion:

		Document.Body.body
	
	As its third parameter, the 
	insert() method allows you to
	tell it where to insert the 
	model relative to the target.
	It accepts:
	
		before
		after
		within [default]
	
	*/
	
App.Document.hide(Document.Body.body);

App.Document.remove(Document.Body.body);
	
	/*
	
	Elements can be hidden or removed 
	easily with the model object's 
	hide() or remove() method.
	
	Both methods expect a document 
	element object as the only 
	parameter:
	
		Document.Body.body
	
	By controlling modules via the 
	Document object methods, you can 
	avoid selectors, and maintain
	object oriented control of your
	DOM.
	
	
	*/
	
	

App.Engine = new engine({

	/* 

	Air JS's Engine Model 
	---------------------
	
	When developing web apps, the engine 
	gets complex quickly, both on the 
	client and server side. Without a 
	framework promoting the use of good 
	JS OOP coding patterns, the code can 
	very quickly become a tangled mess!
	
	By utilizing object prototypes, Air
	JS accesses relevant objects and will 
	find things like IPs, Ports, 
	extensions, and other information
	relevant to a specific task, without
	the developer needing to manually 
	connect things. For example, when 
	creating a socket.IO connection, if
	a server object exists that owns a
	socketPort object, Air will find the
	port! No strings attached. 
	
	*/

	Server : new server({
	
	/*
	
	The server constructor allows all 
	relevant server information to be 
	gathered into one place. Sky JS 
	objects such as:
	
		socketIO object
		AJAX object

	that utilize server information 
	will dynamically locate and utilize
	the information "wireless", without
	
	*/
	
		location : new location({
		
			url 	: new URL("www.website.com"),
			IP		: new IP("1.2.3.4.5"),
			ports 	: new portList({
				
				default 	: new defaultPort("8080"),
				socket		: new socketPort("4545")
				
			}),
			paths	: new pathList({
				
				app 		: "App",
				login		: "Login",
				register	: "Register",
				getData		: "Get"
				
			});
			
		}),
		
		auth : new authentication({
		
			username 	: new username(App.Client.Username),
			password 	: new password(App.Client.Password)
		
		}),
		
	}),
	
	"Socket" : new socketIO({
	
		open : new socketListener("open", function(){
		
			// handle event
		
		}),
	
	}),
	
	/* 
	
	The socketIO object expects an object 
    containing socketListeners as its first 
    parameter.
	
	The SocketIO object accepts a server object,
	portList, socketPort, or port string / int 
	as its second parameter:
	
		App
		Server
		App.Engine
		App.Engine.Server
		App.Engine.Server.ports
		App.Engine.Server.ports.socket
		
		"4545"
		 4545
	
	This is an example of how Air.JS works 
	"wireless" -- If the relevant object exists
	within the same engine, it will be found, 
	without the developer passing the object or
	information in as a parameter. This is called
	wireless association in Air JS. Wireless 
	association is facilitated in a way that is
	very forgiving.
	
	Wireless association will be discussed later
	on in this program, and is the primary 
	proponent of the clean, de-coupled code that 
	Air JS promotes.
	
	In this situation, the relevant object is a
	socketPort. If a server object exists that 
	owns a portList containing a socketPort, 
	it will grab the port.
	
	If there are multiple server objects, the 
	framework will choose the first one that owns 
	a portList and / or a socketPort.
	
	If no socketList object is found in a server 
	object, the framework will search the main 
	scope of the server object. If no socketPort 
	object is found in a server object, or no 
	server object is found in the engine object, 
	the framework will check for a socket object 
	in the engine object's main scope. 
	
	Ultimately, 
	if no socketObject exists, and the developer 
	does not provide the port via parameters, an
	error will be thrown, pointing to the missing 
	data. 

	*/

});

App.init();

