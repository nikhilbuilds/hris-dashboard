export interface Employee {
  id: string;
  name: string;
  department: string;
  leaveType: string;
  leaveStart: string;
  leaveEnd: string;
  dob?: string
}

export interface Department {
  id: string;
  name: string;
}
