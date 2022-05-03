import type { UserItem } from "@directus/sdk";

export type Service = {
	id: number,
    name: string,
	description?: string,
    duration: number,
    price: number
};


export type Employee = {
    id: number,
    account: UserItem,
    services: EmployeeService[],
    workinghours: EmployeeWorkingHour[]
}

export type EmployeeService = {
    employees_id: number,
    services_id: number
}

export type EmployeeWorkingHour = {
    id: number,
    employee: Employee,
    weeekday: number,
    starttime: string,
    endtime: string
}

export type Customer = {
    id: number,
    email: string,
    phone?: string,
    firstname?: string,
    lastname?: string,
    account?: UserItem
}

export type Appointment = {
    id: number,
    service: number,
    customer: Customer,
    employee?: number,
    startdatetime?: string,
    enddatetime?: string
}

export type MyCollections = {
	services: Service,
    employees: Employee,
    appointments: Appointment
};