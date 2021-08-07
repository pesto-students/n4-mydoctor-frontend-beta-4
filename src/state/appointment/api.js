import API from '../../api';

export function bookAppointment(payload) {
  return API.post("/appointments", payload);
}

export function getAppointments({ userId }) {
  return API.get(`/appointments/${userId}`);
}

export function getAppointmentDetails({ appointmentId }) {
  return API.get(`/appointments/${appointmentId}/details`);
}