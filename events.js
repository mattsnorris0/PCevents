function getDate(timeStamp) {
	let ISOStamp = new Date(timeStamp);
	let date = ISOStamp.toLocaleDateString("en-us", { month: "numeric", day: "numeric" });
	return date;
}

async function getEvents() {
	  const url = "https://test-web-app-68qm.onrender.com/events";
	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}
		const resData = await res.json();
		return resData;
	} catch (err) {
		console.error(err);
	}
}

async function addEvents() {
	let eventName;
	try {
		const events = await getEvents();
		const parentDiv = document.getElementById("inner_2777848");
		const childDiv = parentDiv.children[0];
		for (const event of events) {
			eventName = `${event.name} | ${getDate(event.starts)}`;
			const newDiv = document.createElement("div");
			newDiv.classList.add("event-grid-container");
			newDiv.innerHTML +=
				`<div class="event-inner">
						<div class="event-flexbox">
							<div class="event-grid-unit left-unit lazyloaded">
								<div class="event-overlay"></div>
								<div class="event-img-body">
									<div class="image-block center m-inherit">
										<div class="event-img-holder">
										<img src=${event.image} loading="lazy" alt=“event “graphic>
										</div>
									</div>
								</div>
							</div>
							<div class="event-grid-unit right-unit lazyloaded">
								<div class="event-overlay"></div>
								<div class="event-info-body">
									<div class="event-heading-block">
										<div class="heading-hold a-inherit ma-inherit">
											<h4 class="rtedit h event-heading"><strong>${eventName}</strong></h4>
										</div>
									</div>
									<div class="event-info-block">
										<div class="rtedit">
											<p class="event-info"></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>`
			childDiv.appendChild(newDiv);
		}
		const info = document.querySelectorAll(".event-info");
		for (let i = 0; i< info.length; i++) {
			info[i].innerText = events[i].description;
		}
	} catch (err) {
		console.error(err);
	}
}

addEvents();
