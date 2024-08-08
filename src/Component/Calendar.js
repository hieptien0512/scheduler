import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { ScheduleComponent, ResourcesDirective, TimelineViews, ResourceDirective, ViewsDirective, ViewDirective, Day, Week, Month, Agenda, Inject } from "@syncfusion/ej2-react-schedule";
import { useNavigate } from "react-router-dom";

function Calendar({ token }) {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [ownerData, setOwnerData] = useState(null);
    const [userData, setUserData] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const group = { resources: ['Owners'] }

    const getUserData = async () => {
        const reqData = await fetch('http://localhost/final/scheduler/api/user.php', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const resData = await reqData.json();
        if (resData.fail) {
            navigate('/login');
        }

        setUserData(resData);
    }

    //this hook is for get appointment of multiple user
    const fetchAppointmentsByUsers = useCallback(async (userIds) => {
        try {
            const userIdsParam = userIds.join(',');
            const response = await axios.get(`http://localhost/final/scheduler/api/appointment.php?user_ids=${userIdsParam}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const filteredAppointments = response.data.value.map(appointment => ({
                ...appointment,
                OwnerId: appointment.OwnerId.map(id => parseInt(id, 10))
            }));

            setAppointments(filteredAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            navigate('/login');
        }
    }, [token, navigate]);

    const handleUserSelection = (userId) => {
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter(id => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const updateOwnerData = (userIds) => {
        const filteredOwnerData = userData.filter(user => userIds.includes(parseInt(user.id))).map(user => ({
            OwnerText: user.username,
            Id: parseInt(user.id, 10),
            OwnerColor: user.color
        }));
        setOwnerData(filteredOwnerData);
    };


    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost/final/scheduler/api/appointment.php', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.fail) {
                navigate('/login');
            }

            const formattedData = response.data.value.map(appointment => ({
                ...appointment,
                OwnerId: appointment.OwnerId.map(id => parseInt(id, 10))
            }));
            setAppointments(formattedData);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            navigate('/login');
        }
    }, [token]);

    const fetchCurrentUserData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost/final/scheduler/api/user.php/current', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.error) {
                navigate('/login');
            }

            const formattedOwnerData = [response.data].map(owner => ({
                OwnerText: response.data.OwnerText,
                Id: parseInt(response.data.Id, 10), // Ensure the ID is an integer
                OwnerColor: response.data.OwnerColor// Ensure 'color' is a field in your response data
            }));

            setOwnerData(formattedOwnerData);
        } catch (error) {
            console.error('Error fetching current user data:', error);
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchCurrentUserData();
    }, [fetchCurrentUserData]);

    useEffect(() => {
        fetchData();
        getUserData();
    }, [fetchData]);

    useEffect(() => {
        if (selectedUsers.length > 0) {
            fetchAppointmentsByUsers(selectedUsers);
            updateOwnerData(selectedUsers);
        }
    }, [selectedUsers, fetchAppointmentsByUsers]);

    const handleActionComplete = async (args) => {
        if (args.requestType === 'eventCreated') {
            const eventData = args.data;
            try {
                const response = await axios.post('http://localhost/final/scheduler/api/appointment.php', eventData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Appointment created:', response.data);
                fetchAppointmentsByUsers(selectedUsers);
            } catch (error) {
                console.error('Error creating appointment:', error);
            }
        }

        if (args.requestType === 'eventRemoved') {
            const eventData = args.data;
            try {
                const response = await axios.delete('http://localhost/final/scheduler/api/appointment.php', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: eventData // Pass the event data in the data property
                });
                console.log('Appointment deleted:', response.data);
                fetchAppointmentsByUsers(selectedUsers);
            } catch (error) {
                console.error('Error deleted appointment:', error);
            }
        }

        if (args.requestType === 'eventChanged') {
            const eventData = args.data;
            try {
                const response = await axios.put('http://localhost/final/scheduler/api/appointment.php', eventData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Appointment deleted:', response.data);
                fetchAppointmentsByUsers(selectedUsers);
            } catch (error) {
                console.error('Error deleted appointment:', error);
            }
        }
    };

    const eventSettings = { dataSource: appointments };

    if (!ownerData) {
        // Optionally render a loading indicator
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="mt-4 mb-2">
                        <h4 className="mb-4">Scheduler</h4>
                        <div className="mb-2" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                            <table className="table table-bordered">
                                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                                    <tr>
                                        <th scope="col">User List</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((user, index) => (
                                        <tr key={index}>
                                            <td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span>{user.username}</span>
                                                <input type="checkbox" id={`user-${index}`} onChange={() => handleUserSelection(parseInt(user.id))} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <ScheduleComponent width='100%' currentView='Week'
                            selectedDate={new Date()}
                            eventSettings={eventSettings}
                            group={group}
                            actionComplete={handleActionComplete}
                        >
                            <ViewsDirective>
                                <ViewDirective option='Week' />
                                <ViewDirective option='Day' />
                                <ViewDirective option='Month' />
                                <ViewDirective option='TimelineWeek' />
                                <ViewDirective option='TimelineDay' />
                                <ViewDirective option='Agenda' />
                            </ViewsDirective>
                            <ResourcesDirective>
                                <ResourceDirective field='OwnerId' title='Owner' name='Owners' allowMultiple={true} dataSource={ownerData} textField='OwnerText' idField='Id' colorField='OwnerColor'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            <Inject services={[Day, Week, Month, TimelineViews, Agenda]} />
                        </ScheduleComponent>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Calendar;
