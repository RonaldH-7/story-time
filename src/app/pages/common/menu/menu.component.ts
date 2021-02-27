import { Component, OnInit, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit, AfterViewChecked {
  menuItems: MenuItem[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.menuItems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['home'] },
      { label: 'Discover', icon: 'pi pi-fw pi-compass', routerLink: ['discover'] },
      { label: 'Community', icon: 'pi pi-fw pi-users', routerLink: ['community'] },
      { label: 'Statistics', icon: 'pi pi-fw pi-chart-bar', routerLink: ['statistics'] }
    ];
  }

  ngAfterViewChecked() {
    let url = this.router.url;
    url = url.slice(1, url.length); // Removes the '/' from the url

    let itemsByText = document.getElementsByClassName('p-menuitem-text');
    let itemsByIcon = document.getElementsByClassName('p-menuitem-icon');

    for (let i = 0; i < itemsByText.length; i++) {
      if (itemsByText[i].innerHTML.toLowerCase() === url) {
        itemsByText[i].classList.add("active");
        itemsByIcon[i].classList.add("active");
      }
    }
  }

  /**
   * Adds the 'active' class to the element that was clicked
   * @param event The click event
   */
  setActive(event: any) {
    let itemsByText = document.getElementsByClassName('p-menuitem-text');
    let itemsByIcon = document.getElementsByClassName('p-menuitem-icon');

    // Removes the 'active' class from everything (except when clicking on search bar)
    if (!event.target.classList.contains('p-inputtext')) {
      for (let i = 0; i < itemsByText.length; i++) {
        itemsByText[i].classList.remove("active");
        itemsByIcon[i].classList.remove("active");
      }
    }

    // Always sets node to point to the <a>, even if the user clicks
    // on the <span> (i.e. the icon or the text)
    let node;
    if (event.target.tagName === "A") {
      node = event.target;
    } else {
      node = event.target.parentNode;
    }

    // Adds the 'active' class to its two child <span> elements
    if (!event.target.classList.contains('p-inputtext')) {
      for (let i = 0; i < node.children.length; i++) {
        node.children[i].classList.add("active");
      }
    }
  }
}

