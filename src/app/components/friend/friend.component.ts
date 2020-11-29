import { Component, OnInit, ViewChild } from '@angular/core';
import { FriendsService } from '../../service/friend.service';
//DATATABLE
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
//MODAL DIALOG
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../../service/dialog.service';
// NOTIFICATION SERVICE
import { NotificationService } from '../../service/notification.service';
//MODEL
import { Friend } from '../../model/friend';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
  providers: [FriendsService],
})
export class FriendComponent implements OnInit {
  save = true;
  edit = false;
  id: number;
  name: string;
  gender: string;
  user: Friend;
  noData: boolean = false;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'gender', 'actions'];

  searchKey: string;
  //Directives
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public service: FriendsService,
    private dialog: MatDialog,
    public dialogService: DialogService,
    public notificationService: NotificationService
  ) {
    this.service.getFriends().subscribe((friends) => {
      console.log(friends);

      if (friends.length === 0) {
        this.noData = true;
      }

      this.listData = new MatTableDataSource(friends);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  ngOnInit(): void {}

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEditForm(row) {
    const { id, name, gender } = row;
    this.id = id;
    this.name = name;
    this.gender = gender;

    //change forms
    this.edit = true;
    this.save = false;
  }
  onSaveForm(e) {
    this.edit = false;
    this.save = true;
  }

  onDelete(row) {
    const id = row.id;
    console.log(id);
    this.dialogService
      .openConfirmDialog('Estas seguro de eliminar el registro ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          try {
            this.service.deleteFriend(id).subscribe((res) => {
              console.log(res);

              this.notificationService.warn(`!${res.message}!`);
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
  }
}
