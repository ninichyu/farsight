"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Activity, BellRing, Check, ChevronRight, Clock3, MapPin, Radio, ShieldAlert, Signal, X } from "lucide-react";

const IncidentMap = dynamic(() => import("./components/IncidentMap"), { ssr: false });

const alerts = [
	{
		id: "FS-0248",
		name: "Connie W.",
		type: "SOS triggered",
		place: "Near Sather Gate",
		time: "Just now",
		latitude: 37.8719,
		longitude: -122.2585,
		status: "Needs review",
	},
	{
		id: "FS-0247",
		name: "Jordan K.",
		type: "Check-in missed",
		place: "Telegraph Avenue",
		time: "8 min ago",
		latitude: 37.8678,
		longitude: -122.2581,
		status: "Acknowledged",
	},
];

export default function Home() {
	const [selectedId, setSelectedId] = useState(alerts[0].id);
	const [showBroadcast, setShowBroadcast] = useState(false);
	const [notice, setNotice] = useState("");
	const selectedAlert = alerts.find((alert) => alert.id === selectedId) ?? alerts[0];

	function previewBroadcast() {
		setShowBroadcast(false);
		setNotice("Demo broadcast preview created for the Northside area.");
		window.setTimeout(() => setNotice(""), 4200);
	}

	return (
		<main className="command-shell">
			<aside className="queue-panel">
				<header className="brand-row">
					<div className="brand-mark"><Radio size={20} strokeWidth={2.2} /></div>
					<div>
						<p className="brand-name">Farsight <span>Command</span></p>
						<p className="brand-caption">CAMPUS RESPONSE</p>
					</div>
					<button className="icon-button notification-button" aria-label="Notifications">
						<BellRing size={18} />
						<i />
					</button>
				</header>

				<div className="queue-heading">
					<div>
						<p className="eyebrow">Response queue</p>
						<h1>Active alerts <span className="count-badge">02</span></h1>
					</div>
					<span className="live-status"><i /> LIVE</span>
				</div>

				<div className="alert-list" aria-label="Active alerts">
					{alerts.map((alert) => (
						<button
							className={`alert-item ${selectedId === alert.id ? "selected" : ""}`}
							key={alert.id}
							onClick={() => setSelectedId(alert.id)}
							aria-pressed={selectedId === alert.id}
						>
							<span className={`alert-icon ${alert.id === alerts[0].id ? "urgent" : "missed"}`}>
								{alert.id === alerts[0].id ? <Activity size={18} /> : <Clock3 size={18} />}
							</span>
							<span className="alert-copy">
								<span className="alert-topline"><strong>{alert.type}</strong><time>{alert.time}</time></span>
								<span className="alert-person">{alert.name}</span>
								<span className="alert-location"><MapPin size={12} /> {alert.place}</span>
							</span>
							<ChevronRight className="alert-chevron" size={16} />
						</button>
					))}
				</div>

				<section className="selected-summary" aria-live="polite">
					<div className="section-label"><span>SELECTED INCIDENT</span><span>{selectedAlert.id}</span></div>
					<div className="summary-person"><span className="avatar">{selectedAlert.name.charAt(0)}</span><div><strong>{selectedAlert.name}</strong><span>{selectedAlert.status}</span></div></div>
					<div className="coordinate-row"><span>LATITUDE</span><code>{selectedAlert.latitude.toFixed(4)}° N</code></div>
					<div className="coordinate-row"><span>LONGITUDE</span><code>{Math.abs(selectedAlert.longitude).toFixed(4)}° W</code></div>
				</section>

				<div className="queue-footer">
					<div className="privacy-note"><ShieldAlert size={16} /><span>Restricted response view<br /><small>Only authorized staff can access incidents.</small></span></div>
					<button className="broadcast-button" onClick={() => setShowBroadcast(true)}>
						<Radio size={17} /> Preview area warning
					</button>
					<p className="demo-disclaimer">DEMO MODE · No alerts are sent</p>
				</div>
			</aside>

			<section className="map-panel" aria-label="Campus incident map">
				<div className="map-topbar">
					<div><p className="eyebrow">Live operations</p><h2>Berkeley campus <span>·</span> North district</h2></div>
					<div className="map-meta"><span><Signal size={14} /> CONNECTION HEALTHY</span><span className="map-meta-divider" /><span>UPDATED JUST NOW</span></div>
				</div>
				<div className="map-wrap">
					<IncidentMap alerts={alerts} selectedId={selectedId} onSelect={setSelectedId} />
					<div className="map-legend"><span className="legend-dot urgent-dot" /> Active SOS <span className="legend-dot pending-dot" /> Check-in missed</div>
					<div className="map-watermark">FARSIGHT <span>FIELD VIEW / 01</span></div>
				</div>
				<footer className="map-footer"><span><span className="footer-dot" /> 2 incidents in view</span><span>MAP DATA © OPENSTREETMAP CONTRIBUTORS</span></footer>
			</section>

			{notice && <div className="toast" role="status"><Check size={17} />{notice}</div>}

			{showBroadcast && (
				<div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowBroadcast(false); }}>
					<section className="broadcast-dialog" role="dialog" aria-modal="true" aria-labelledby="broadcast-title">
						<button className="icon-button modal-close" aria-label="Close" onClick={() => setShowBroadcast(false)}><X size={18} /></button>
						<div className="dialog-icon"><ShieldAlert size={22} /></div>
						<p className="eyebrow">Authorized response only</p>
						<h2 id="broadcast-title">Preview an area warning</h2>
						<p className="dialog-copy">This demo creates a local preview for a generalized campus area. It does not share a person’s live location or send notifications.</p>
						<div className="warning-preview"><span className="warning-ring" /><div><strong>Northside campus</strong><span>Suggested radius · 500 m · Expires in 1 hour</span></div></div>
						<div className="dialog-actions"><button className="cancel-button" onClick={() => setShowBroadcast(false)}>Cancel</button><button className="confirm-button" onClick={previewBroadcast}>Create preview</button></div>
					</section>
				</div>
			)}
		</main>
	);
}
