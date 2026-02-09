import { useNavigate, useParams } from "react-router";
import { users } from "../../../lib/data/sampleData";
<<<<<<< HEAD
import type { AppEvent, FirestoreAppEvent } from "../../../lib/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
=======
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import type { AppEvent } from "../../../lib/types";
import { createEvent, selectEvent, updateEvent } from "../eventSlice";
import { useEffect } from "react";
import { type FieldValues, useForm } from "react-hook-form";
>>>>>>> de7542c0fb3298521bac62c709b896e39257d0f7
import TextInput from "../../../app/shared/components/TextInput";
import { eventFormSchema } from "../../../lib/schemas/eventFormSchema";
import type { EventFormSchema } from "../../../lib/schemas/eventFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from "../../../app/shared/components/TextArea";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import PlaceInput from "../../../app/shared/components/PlaceInput";
<<<<<<< HEAD
import { useDocument } from "../../../lib/hooks/useDocuments";
import { useFirestoreActions } from "../../../lib/hooks/useFirestoreActions";
import { Timestamp } from "firebase/firestore";
import { handleError } from "../../../lib/util/util";
export default function EventForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: selectedEvent, loading } = useDocument<AppEvent>({ path: 'events', id });
    const { update, submitting, create } = useFirestoreActions<FirestoreAppEvent>({ path: 'events' })
=======
export default function EventForm() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(state => state.event.selectedEvent);
>>>>>>> de7542c0fb3298521bac62c709b896e39257d0f7
    const { control, handleSubmit, reset, formState: { isValid } } = useForm<EventFormSchema>({
        mode: 'onTouched',
        resolver: zodResolver(eventFormSchema),

    });
    useEffect(() => {
<<<<<<< HEAD
        if (selectedEvent) {
            reset({
                ...selectedEvent,
                date: selectedEvent.date.slice(0, 16),
                venue: {
                    venue: selectedEvent.venue,
                    latitude: selectedEvent.latitude,
                    longitude: selectedEvent.longitude
                }
            })
        }
    }, [id, selectedEvent, reset]);
    const processFormData = (data: EventFormSchema) => {
        return {
            ...data,
            date: Timestamp.fromDate(new Date(data.date)),
            venue: data.venue.venue,
            latitude: data.venue.latitude,
            longitude: data.venue.longitude,
=======
        if (id) {
            dispatch(selectEvent(id));
            if (selectedEvent) {
                reset({
                    ...selectedEvent,
                    date: new Date(selectedEvent.date).toISOString().slice(0, 16),
                    venue: {
                        venue: selectedEvent.venue,
                        latitude: selectedEvent.latitude,
                        longitude: selectedEvent.longitude
                    }
                })
            }
        } else {
            dispatch(selectEvent(null));
        }
    }, [dispatch, id, selectedEvent, reset]);
    const onSubmit = (data: FieldValues) => {
        if (selectedEvent) {
            dispatch(updateEvent({ 
                ...selectedEvent, 
                ...data,
                venue: data.venue.venue,
                latitude: data.venue.latitude,
                longitude: data.venue.longitude, 
            }));
            navigate(`/events/${selectedEvent.id}`);
            return;
        } else {
            const id = crypto.randomUUID();
            const newEvent = {
                ...data,
                id,
                venue: data.venue.venue,
                latitude: data.venue.latitude,
                longitude: data.venue.longitude,
                hostUid: users[0].uid,
                attendees: [{
                    id: users[0].uid,
                    displayName: users[0].displayName,
                    photoURL: users[0].photoURL,
                    isHost: true
                }],
            }
            dispatch(createEvent(newEvent as AppEvent));
            navigate(`/events/${id}`);
>>>>>>> de7542c0fb3298521bac62c709b896e39257d0f7
        }
    }
    const onSubmit = async (data: EventFormSchema) => {
        try {
            if (selectedEvent) {
                await update(selectedEvent.id, {
                    ...selectedEvent,
                    ...data,
                    ...processFormData(data)
                });
                navigate(`/events/${selectedEvent.id}`);
                return;
            } else {
                const newEvent = {
                    ...data,
                    ...processFormData(data),
                    hostUid: users[0].uid,
                    attendees: [{
                        id: users[0].uid,
                        displayName: users[0].displayName,
                        photoURL: users[0].photoURL,
                        isHost: true
                    }],
                    attendeeIds: [users[0].uid],
                }
                const ref = await create(newEvent as FirestoreAppEvent);
                navigate(`/events/${ref.id}`);
            }
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    }
    if (loading) return <div>Loading...</div>
    return (
        <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
            <h3 className="text-2xl font-semibold text-center text-primary">
                {selectedEvent ? 'Edit Event' : 'Create Event'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
                <TextInput
                    control={control}
                    name='title'
                    label='Title'
                />
                <TextArea
                    control={control}
                    name='description'
                    label='Description'
                    rows={3}
                />
                <div className="flex gap-3 items-center w-full">
                    <SelectInput
                        control={control}
                        name='category'
                        label='Category'
                        options={categoryOptions}
                    />
                    <TextInput
                        control={control}
                        name='date'
                        label='Date'
                        type="datetime-local"
                        min={new Date}
                    />
                </div>
<<<<<<< HEAD
=======

>>>>>>> de7542c0fb3298521bac62c709b896e39257d0f7
                <PlaceInput
                    control={control}
                    name='venue'
                    label='Venue'
                />
                <div className="flex justify-end w-full gap-3">
                    <button onClick={() => navigate(-1)} type="button" className="btn btn-neutral">Cancel</button>
                    <button
<<<<<<< HEAD
                        disabled={!isValid || submitting}
                        type="submit"
                        className="btn btn-primary">
                        {submitting &&
                            <span className="loading loading-spinner"></span>
                        }
                        Submit
                    </button>
=======
                        disabled={!isValid}
                        type="submit"
                        className="btn btn-primary">Submit</button>
>>>>>>> de7542c0fb3298521bac62c709b896e39257d0f7
                </div>
            </form>
        </div>
    )
}