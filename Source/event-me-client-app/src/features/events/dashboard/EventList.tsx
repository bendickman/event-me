import { useEffect, useState } from "react"

export default function EventList () {
    const [appEvents, setAppEvents] = useState<AppEvent[]>([]);

    useEffect(() => {
        fetch('https://localhost:7171/api/v1/event?pagesize=25')
            .then(response => response.json())
            .then(data => setAppEvents(data.items))
    }, [])

    return (
        <div>
            <ul>
                {appEvents.map((appEvent) => (
                    <li key={appEvent.id}>{appEvent.title}</li>
                ))}
            </ul>
        </div>
    )
}