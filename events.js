 function getDate(timeStamp) {
	let ISOStamp = new Date(timeStamp);
	let date = ISOStamp.toLocaleDateString("en-us", { month: "numeric", day: "numeric" });
	return date;
}

async function getEvents() {
	  const url = "https://webapi--soma-church-web-app.us-central1.hosted.app/events";
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
		const parentDiv = document.getElementById("events");
		for (const event of events) {
			eventName = `${event.name} | ${getDate(event.starts)}`;
			const newDiv = document.createElement("div");
			newDiv.classList.add("event-grid-container");
			newDiv.innerHTML +=
				`<div class="event-flexbox">
					<img src=${event.image} loading="lazy" alt=“event graphic">	
					<div class="event-grid-unit lazyloaded">
						<div class="event-info-cont">
							<div class="event-heading-block">
								<div class="heading-hold a-inherit ma-inherit">
									<h4 class="rtedit h event-heading"><strong>${eventName}</strong></h4>
								</div>
							</div>
							<div class="event-info-block">
								<p class="event-info"></p>
							</div>
						</div>
					</div>
				</div>`
			parentDiv.appendChild(newDiv);
		}
		for (let i = 0; i< events.length; i++) {
            const info = document.querySelectorAll(".event-info");
            const div = document.querySelectorAll(".event-grid-unit");
			info[i].innerText = events[i].description;
            if(events[i].registration !== null) {
                const btn = document.createElement("a");
                btn.classList.add("btn", "main", "event-btn");
		        btn.href = events[i].registration;
                btn.innerText = "Register";
                div[i].appendChild(btn);
            }
		}
	} catch (err) {
		console.error(err);
	}
}

addEvents();
