import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  providers: [DatePipe]
})
export class RequestComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  showRequestForm = false;
  editingRequest: any = null;
  requestFormGroup!: FormGroup;
  searchQuery: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private cdRef: ChangeDetectorRef, private datePipe: DatePipe) {}

  ngOnInit() {
    this.fetchRequests();
    this.requestFormGroup = this.fb.group({
      user: ['', Validators.required],
      hardwareType: ['', Validators.required],
      parameters: ['', Validators.required],
      justification: ['', Validators.required],
      requestTime: ['', Validators.required],
      status: ['PENDING', Validators.required]
    });
  }

  trackByRequestId(index: number, request: any): number {
    return request.id;
  }

  fetchRequests() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/requests').subscribe(
      (data) => {
        this.requests = Array.isArray(data) ? data : [];
        this.filteredRequests = [...this.requests];
        this.loading = false;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching requests:', error);
        this.loading = false;
      }
    );
  }

  searchRequests() {
    if (this.searchQuery.trim() === '') {
      this.filteredRequests = [...this.requests];
    } else {
      this.filteredRequests = this.requests.filter(request =>
        request.user?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

  openRequestForm(request: any = null) {
    this.editingRequest = request;
    this.requestFormGroup.setValue(request
      ? {
          user: request.user.name,
          hardwareType: request.hardwareType,
          parameters: request.parameters,
          justification: request.justification,
          requestTime: request.requestTime,
          status: request.status
        }
      : {
          user: '',
          hardwareType: '',
          parameters: '',
          justification: '',
          requestTime: new Date().toISOString(),
          status: 'PENDING'
        });
    this.showRequestForm = true;
  }

  closeRequestForm() {
    this.showRequestForm = false;
    this.editingRequest = null;
  }

  saveRequest() {
    if (this.requestFormGroup.invalid) return;
  
    const requestPayload = {
      ...this.requestFormGroup.value,
      user: { name: this.requestFormGroup.value.user },
      requestTime: new Date(this.requestFormGroup.value.requestTime).toISOString()
    };
  
    const request = this.editingRequest
      ? this.http.put(`http://localhost:8080/api/requests/${this.editingRequest.id}`, requestPayload, { headers: { 'Content-Type': 'application/json' } })
      : this.http.post(`http://localhost:8080/api/requests`, requestPayload, { headers: { 'Content-Type': 'application/json' } });
  
    request.subscribe(
      () => {
        this.fetchRequests();
        this.closeRequestForm();
      },
      (error) => {
        console.error('Request error:', error);
      }
    );
  }  

  editRequest(request: any) {
    this.openRequestForm(request);
  }

  deleteRequest(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this request?");
    if (confirmed) {
      this.http.delete(`http://localhost:8080/api/requests/${id}`).subscribe(
        () => {
          this.fetchRequests();
        },
        (error) => {
          console.error('Error deleting request:', error);
        }
      );
    }
  }

  accept(requestId: number) {
    this.http.patch(`http://localhost:8080/api/requests/${requestId}/status`, { status: 'APPROVED' }, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      () => {
        this.fetchRequests();
      },
      (error) => {
        console.error('Error accepting request:', error);
      }
    );
  }
  
  deny(requestId: number) {
    this.http.patch(`http://localhost:8080/api/requests/${requestId}/status`, { status: 'REJECTED' }, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      () => {
        this.fetchRequests();
      },
      (error) => {
        console.error('Error denying request:', error);
      }
    );
  }
}
