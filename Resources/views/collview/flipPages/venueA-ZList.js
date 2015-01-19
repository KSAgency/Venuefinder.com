function venueList(win, windowsArray, venueatozScrollView) {

	var styleID = win.styleID;
	var lastClicked;
	var tableContainer = getVenues('A', styleID, windowsArray);
	var atomView = Ti.UI.createView({
		width : '350',
		height : '22',
		top : '0',
		left : '71',
		zIndex : 101,
		layout : 'horizontal',
	});

	var hashButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : '#',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	hashButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != hashButton) {
			hashButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			//hashButton.font.fontFamily = 'Arial';
			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = hashButton;
		}

		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('#', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(hashButton);

	var aButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'A',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	aButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != aButton) {
			aButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = aButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('A', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	lastClicked = aButton;
	atomView.add(aButton);

	var bButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'B',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	bButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != bButton) {
			bButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = bButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('B', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}

	});

	atomView.add(bButton);

	var cButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'C',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	cButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != cButton) {
			cButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = cButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('C', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(cButton);

	var dButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'D',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	dButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != dButton) {
			dButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = dButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('D', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(dButton);

	var eButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'E',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	eButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != eButton) {
			eButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = eButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('E', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}

	});

	atomView.add(eButton);

	var fButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'F',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	fButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != fButton) {
			fButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = fButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('F', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(fButton);

	var gButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'G',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	gButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != gButton) {
			gButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = gButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('G', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(gButton);

	var hButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'H',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	hButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != hButton) {
			hButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = hButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('H', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(hButton);

	var iButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'I',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	iButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != iButton) {
			iButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = iButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('I', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(iButton);

	var jButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'J',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	jButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != jButton) {
			jButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = jButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('J', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(jButton);

	var kButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'K',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	kButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != kButton) {
			kButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = kButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('K', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(kButton);

	var lButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'L',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	lButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != lButton) {
			lButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = lButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('L', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(lButton);

	var mButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'M',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	mButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != mButton) {
			mButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = mButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('M', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	atomView.add(mButton);

	venueatozScrollView.add(atomView);

	//N to Z Button
	var ntozView = Ti.UI.createView({
		width : '350',
		height : '22',
		top : '0',
		right : '81',
		zIndex : 101,
		layout : 'horizontal',
	});

	var nButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'N',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	nButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != nButton) {
			nButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = nButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('N', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(nButton);

	var oButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'O',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	oButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != oButton) {
			oButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = oButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('O', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(oButton);

	var pButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'P',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	pButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != pButton) {
			pButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = pButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('P', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(pButton);

	var qButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'Q',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	qButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != qButton) {
			qButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = qButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('Q', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(qButton);

	var rButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'R',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	rButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != rButton) {
			rButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = rButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('R', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(rButton);

	var sButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'S',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	sButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != sButton) {
			sButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = sButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('S', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(sButton);

	var tButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'T',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	tButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != tButton) {
			tButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = tButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('T', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(tButton);

	var uButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'U',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	uButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != uButton) {
			uButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = uButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('U', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(uButton);

	var vButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'V',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	vButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != vButton) {
			vButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = vButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('V', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(vButton);

	var wButton = Ti.UI.createButton({
		width : '22',
		height : '24',
		top : '0',
		left : '5',
		title : 'W',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	wButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != wButton) {
			wButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = wButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('W', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(wButton);

	var xButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'X',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	xButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != xButton) {
			xButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = xButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('X', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(xButton);

	var yButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'Y',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	yButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != yButton) {
			yButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = yButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('Y', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(yButton);

	var zButton = Ti.UI.createButton({
		width : '20',
		height : '24',
		top : '0',
		left : '5',
		title : 'Z',
		font : {
			fontSize : '24',
			fontFamily : Ti.App.Properties.getString('fontFamily'),
		},
		color : '#000000',
	});

	zButton.addEventListener('click', function(e) {
		var createStartActInd = require('/builders/startActInd');
		var startActInd = createStartActInd(win);
		if (lastClicked != zButton) {
			zButton.font = {
				fontWeight : 'bold',
				fontFamily : 'Arial',
				fontSize : '24',
			};

			lastClicked.font = {
				fontWeight : 'normal',
				fontFamily : Ti.App.Properties.getString('fontFamily'),
				fontSize : '24',
			};

			lastClicked = zButton;
		}
		if (tableContainer != undefined) {
			venueatozScrollView.remove(tableContainer);
		}

		tableContainer = getVenues('Z', styleID, windowsArray);

		if (tableContainer == undefined) {
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
			noResultWindow();
		} else {
			venueatozScrollView.add(tableContainer);
			var createEndActInd = require('/builders/endActInd');
			var endActInd = createEndActInd(win, startActInd[0], startActInd[1]);
		}
	});

	ntozView.add(zButton);

	aButton.font = {
		fontWeight : 'bold',
		fontFamily : 'Arial',
		fontSize : '24',
	};

	venueatozScrollView.add(ntozView);

	if (tableContainer == undefined) {
		noResultWindow();
	} else {
		venueatozScrollView.add(tableContainer);
	}
	win.add(venueatozScrollView);

	return venueatozScrollView;

}

module.exports = venueList;

function getVenues(venueStarts, styleID, windowsArray) {

	// Load Results From DB
	var createDatabase = require('/builders/databaseFunctions/createDatabase');
	var db = createDatabase('/venuefinder.db', 'venuefinder');
	var dataArray = [];

	var query;
	if (venueStarts == '#') {
		query = 'SELECT * FROM Venue WHERE VenueSort < "A%" and VenueID in (select venueid from venuetovenuestyles where venuestyleid = ' + styleID + ') AND  PackageCode in ("GLD","SIL","BRZ") ORDER BY venuesort ASC';
	} else {
		query = 'SELECT * FROM Venue WHERE VenueSort like "' + venueStarts + '%" and VenueID in (select venueid from venuetovenuestyles where venuestyleid = ' + styleID + ') AND  PackageCode in ("GLD","SIL","BRZ") ORDER BY venuesort ASC';
	}

	var rows = db.execute(query);
	if (rows.rowCount <= 0) {
		return undefined;
	}
	while (rows.isValidRow()) {
		if (rows.fieldByName('VenueName') != undefined) {

			var venueArray = [];
			venueArray['venueID'] = rows.fieldByName('VenueID');
			venueArray['venueName'] = rows.fieldByName('VenueName');
			venueArray['venueTown'] = rows.fieldByName('Town');
			venueArray['bedroomsNo'] = rows.fieldByName('BedroomsNo');
			venueArray['postCode'] = rows.fieldByName('Postcode');
			venueArray['meetingRoomsNo'] = rows.fieldByName('MeetingRoomsNo');
			venueArray['packageCode'] = rows.fieldByName('PackageCode');

			var getImage = db.execute('SELECT * FROM VenueAdvertOptionsForWeb WHERE VenueID="' + venueArray['venueID'] + '" AND (OptionCode="TOP" OR OptionCode="PIC")');
			var imageUrl = '';
			if (getImage.isValidRow()) {
				imageUrl = getImage.fieldByName('GraphicFileName');
			}
			venueArray['imageUrl'] = imageUrl;

			var location = '';
			if (venueArray['venueTown'] != '') {
				if (venueArray['postCode'] != '') {
					location = venueArray['venueTown'] + ', ' + venueArray['postCode'];
				} else {
					location = venueArray['venueTown'];
				}
			} else if (venueArray['postCode'] != '') {
				location = venueArray['postCode'];
			}
			venueArray['location'] = location;
			dataArray.push(venueArray);
		}
		rows.next();
	}
	db.close();
	var venueThumbView = require('/views/collview/getVenueThumbView');

	var pageViewArray = [];
	var arrayLength = dataArray.length;
	if (arrayLength != 0) {
		var noOfRow = Math.ceil(arrayLength / 4);
		var k = 0;
		var venueCount = 0;
		var top = 0;
		var vMarzin = 11;
		var hMarzin = 11;
		var pageGap = 84;
		for (var i = 0; i < noOfRow; i++) {

			var tableRow = Titanium.UI.createTableViewRow({
				height : 191,
				selectionStyle : 'none',
				backgroundColor : 'rgba(255,255,255,0)',
				zIndex : 101,
				top : '0',
			});

			var left = 80;
			for (var l = 0; l < 4; l++) {
				var venueDataArray = dataArray[venueCount];
				if (venueDataArray != undefined && venueDataArray['venueName'] != undefined) {
					if (l == 2) {
						left = left + pageGap - hMarzin;
					}
					var nextVenueId = 0;
					//using for BRZ venues

					if (venueDataArray['packageCode'] == 'BRZ') {
						for (var j = venueCount + 1; j < dataArray.length; j++) {
							if (dataArray[j]['packageCode'] != undefined && dataArray[j]['packageCode'] == 'BRZ') {
								nextVenueId = dataArray[j]['venueID'];
								break;
							}
						}
					}
					var venue = venueThumbView.getVenueThumb(dataArray[venueCount], top, left, windowsArray, nextVenueId, false);
					tableRow.add(venue);

					left = left + 168 + hMarzin;
				}
				venueCount++;
			}

			pageViewArray.push(tableRow);
		}
	}
	var tableContainer = Ti.UI.createView({
		backgroundColor : 'rgba(255,255,255,0)',
		top : '30',
		width : '938',
		height : '573',
		zIndex : 101,
		visible : true,
	});
	var tableView = Ti.UI.createTableView({
		backgroundColor : 'rgba(255,255,255,0)',
		data : pageViewArray,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		separatorColor : 'transparent',
	});

	tableContainer.add(tableView);
	return tableContainer;
}

function noResultWindow() {
	var noInput = Titanium.UI.createLabel({
		text : 'Your search returned no results, please try again with a different search term.',
		color : '#999',
		font : {
			fontFamily : 'Arial',
			fontSize : 18,
		}
	});

	var noResultWin = Titanium.UI.createWindow({
		backgroundColor : 'rgba(0,0,0,0.8)',
	});

	var close = Titanium.UI.createButton({
		right : '5%',
		top : '5%',
		height : '20',
		zIndex : 1,
		title : "X",
		color : "#FFF",
		font : {
			fontSize : "28",
			fontWeight : "bold"
		},
	});

	noResultWin.add(close);
	close.addEventListener('click', function(e) {
		noResultWin.close();
	});

	var messageContainer = Ti.UI.createView({
		width : '80%',
		height : '80%',
		top : '10%',
		left : '10%',
		backgroundColor : '#d2e8f5',
	});

	messageContainer.add(noInput);

	noResultWin.add(messageContainer);
	noResultWin.open();
}
