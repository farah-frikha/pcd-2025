import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-messagesd',
  templateUrl: './messagesd.component.html',
  styleUrls: ['./messagesd.component.css']
})
export class MessagesdComponent implements OnInit {
  searchTerm: string = '';
  selectedConversation: any = null;
  newMessage: string = '';
  conversations: any[] = [];

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  ngOnInit() {
    this.conversations = [
      {
        id: 1,
        name: 'Jean Dupont',
        speciality: 'Patient',
        avatar: 'assets/avatar1.png',
        online: true,
        unread: true,
        unreadCount: 3,
        time: '10:30',
        lastMessage: 'Bonjour, j\'ai une question concernant mon traitement',
        messages: [
          {
            text: 'Bonjour, j\'ai une question concernant mon traitement...',
            time: '10:25',
            outgoing: true
          },
          {
            text: 'Je vous écoute, en quoi puis-je vous aider ?',
            time: '10:30',
            outgoing: false
          }
        ]
      },
      {
        id: 2,
        name: 'Marie Martin',
        speciality: 'Patient',
        avatar: 'assets/avatar2.png',
        online: false,
        unread: false,
        time: '09:15',
        lastMessage: 'Merci pour les informations',
        messages: [
          {
            text: 'Puis-je avoir un rendez-vous cette semaine ?',
            time: '09:10',
            outgoing: true
          },
          {
            text: 'Oui, nous avons une disponibilité lundi',
            time: '09:12',
            outgoing: false
          },
          {
            text: 'Merci pour les informations',
            time: '09:15',
            outgoing: true
          }
        ]
      }
    ];
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  markAsRead(conversation: any): void {
    if (conversation.unread) {
      conversation.unread = false;
      conversation.unreadCount = 0;
    }
  }

  filteredConversations() {
    return this.conversations.filter(conv =>
      conv.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
    this.markAsRead(conversation);
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedConversation) {
      this.selectedConversation.messages.push({
        text: this.newMessage,
        time: new Date().toLocaleTimeString(),
        outgoing: true
      });
      this.selectedConversation.lastMessage = this.newMessage;
      this.selectedConversation.time = new Date().toLocaleTimeString();
      this.newMessage = '';
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  getActiveConversations() {
    return this.conversations.filter(conv => conv.online);
  }

  getMessageTime(message: any) {
    return new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  deleteConversation(conversation: any) {
    const index = this.conversations.indexOf(conversation);
    if (index > -1) {
      this.conversations.splice(index, 1);
    }
  }
}
