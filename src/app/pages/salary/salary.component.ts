import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  salaryObj: any = {
    "salaryId": 0,
    "employeeId": 0,
    "salaryDate": "",
    "totalAdvance": 0,
    "presentDays": 0,
    "salaryAmount": 0
  }
  salaryAray: any[] = [];
  employeeArray: any[] = [];
  totalAdvAmount: number = 0;
  totalLeaves: number = 0;
  constructor(private empSrv: EmployeeService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getAllSalary();
    this.loadAllEmp();
  }

  resetObj() {

  }

  loadAllEmp() {
    this.empSrv.getAllEmployee().subscribe((res: any) => {
      this.employeeArray = res.data;
    })
  }

  getAllSalary() {
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllSalary").subscribe((res: any) => {
      this.salaryAray = res.data;
    })
  }

  onUpdate() {

  }

  onSave() {

  }

  getEmpData() {
    this.getAllAdvance();
    this.getAllLeaves();
  }

  getAllAdvance() {
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvance").subscribe((res: any) => {
      const data = res.data.filter((m: any) => m.employeeId == this.salaryObj.employeeId);
      data.forEach((element: any) => {
        this.totalAdvAmount = this.totalAdvAmount + element.advanceAmount;
      });
      this.salaryObj.totalAdvance = this.totalAdvAmount;
    })
  }

  getAllLeaves() {
    this.http.get("http://onlinetestapi.gerasim.in/api/TeamSync/GetAllLeaves").subscribe((res: any) => {
      this.totalLeaves = res.data.filter((m: any) => m.employeeId == this.salaryObj.employeeId).length;
      this.salaryObj.presentDays = 30 - this.totalLeaves;
    })
  }

  calculateSalary() {
    const empData = this.employeeArray.find(m => m.empId == this.salaryObj.employeeId)
    const perDaySalary = empData.salary / 30;
    this.salaryObj.salaryAmount = ((this.salaryObj.presentDays * perDaySalary) - this.salaryObj.totalAdvance).toFixed(0);
  }

  saveSalary() {
    this.http.post("http://onlinetestapi.gerasim.in/api/TeamSync/AddSalary", this.salaryObj).subscribe((res: any) => {

      if (res.result) {
        this.getAllSalary();
      }
      alert(res.message);
    })
  }
}
