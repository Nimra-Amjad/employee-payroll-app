import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeArray: any[] = [];
  employeeObj: any;
  constructor(private empSrv: EmployeeService) {
    this.resetObj();
  }

  resetObj() {
    this.employeeObj = {
      "empId": 0,
      "empName": "",
      "empContactNo": "",
      "empAltContactNo": "",
      "empEmail": "",
      "addressLine1": "",
      "addressLine2": "",
      "pincode": "",
      "city": "",
      "state": "",
      "bankName": "",
      "iFSC": "",
      "accountNo": "",
      "bankBranch": "",
      "salary": 0
    }
  }

  ngOnInit(): void {
    this.loadAllEmployee();
  }

  loadAllEmployee() {
    this.empSrv.getAllEmployee().subscribe((res: any) => {
      this.employeeArray = res.data;
    })
  }

  onSave() {
    this.empSrv.createEmployee(this.employeeObj).subscribe((res: any) => {
      if (res.result) {
        this.loadAllEmployee();
        alert(res.message);
        this.resetObj();
      } else {
        alert(res.message)
      }

    })
  }
}
