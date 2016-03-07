$(document).ready(function() {
	var targetTimes = [];
	var lastIndexPassed = 0;
	var currentlyListening = true;

	if($.url().param('video')) {
		$('body').append('<video id="video" src="../img/' + $.url().param('video') + '"></video>');
	} else {
		$('body').append('<video id="video" src="../img/demo0.mp4"></video>');
	}

	if($.url().param('targetTimes')) {
		// 0, 30, 80, 91.5, 208, 277
		targetTimes = $.url().param('targetTimes').split(',');
		targetTimes = targetTimes.map((time) => {
			return parseInt(time, 10);
		});
	}

	var withinOneSecond = (currentTime, targetTimes) => {
		console.log('withinOneSecond', currentTime, targetTimes);
		return targetTimes.some((targetTime, index) => {
			if(currentTime >= (targetTime - 0.5) && currentTime <= (targetTime + 0.5)) {
				console.log('RETURN TRUE');
				lastIndexPassed = index;
				return true;
			}
		});

	}

	var skipBack = () => {
		console.log('skipBack', lastIndexPassed);
		currentlyListening = false;
		console.log('currentlyListening false');
		video.currentTime = targetTimes[lastIndexPassed] + 1;
		if(lastIndexPassed > 0) {
			lastIndexPassed = lastIndexPassed - 1;
		}
		setTimeout(() => {
			console.log('currentlyListening true');
			currentlyListening = true;
		}, 1500);
	};

	var skipForward = () => {
		console.log('skipForward', lastIndexPassed);
		currentlyListening = false;
		console.log('currentlyListening false');
		video.currentTime = targetTimes[lastIndexPassed + 1] + 1;
		if(lastIndexPassed < targetTimes.length-1) {
			lastIndexPassed = lastIndexPassed + 1;
		}
		setTimeout(() => {
			console.log('currentlyListening true');
			currentlyListening = true;
		}, 1500);
	}

	var playOrPause = () => {
		if (waitingForInput === true) {
			// increase by 1 second and start re-playing
			video.currentTime = video.currentTime + 1.0;
			waitingForInput = false;
			video.play();
		} else {
			video.paused ? video.play() : video.pause();
		}
	}

	var waitingForInput = false;
	var video = $("#video").get(0);
	// $("#video").click(playOrPause);
	$("body").keydown((e) => {
		console.log('e.keydown', e.keyCode);
	    if (e.keyCode == 190) playOrPause();
	    if (e.keyCode == 37) skipBack();
	    if (e.keyCode == 39) skipForward();
	});

	$("#video").bind('timeupdate', () => {
		if(currentlyListening) { // hack due to video events
			console.log('timeupdate', video.currentTime);
			var wws = withinOneSecond(video.currentTime, targetTimes);
			console.log('wws', wws);
			if(wws === true) {
				console.log('here2');
				waitingForInput = true;
				console.log('PAUSING');
				video.pause();
			}
		}
			
	});
});