import { Component, OnInit } from '@angular/core';

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  time: string;
  sender: string;
  avatar: string;
  isRead?: boolean;
  hasImage?: boolean;
  imageUrl?: string;
  hasFile?: boolean;
  fileName?: string;
  fileSize?: string;
  isEmoji?: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  currentChat: Conversation | null = null;
  newMessage: string = '';
  showEmojiPicker: boolean = false;
  showInfoPanel: boolean = false;
  activeCall: any = null;
  isMuted: boolean = false;
  isVideoOff: boolean = false;
  sharedMedia: any[] = [];
  emojis: string[] = ['😀', '😊', '😎', '😍', '🤔', '👍'];

  ngOnInit() {
    // Initialize with mock data
    this.conversations = [
      {
        id: 1,
        name: 'Dr. Smith',
        avatar: 'assets/avatar1.jpg',
        isOnline: true,
        lastMessage: 'Bonjour',
        lastMessageTime: '10:30',
        messages: []
      }
      // Add more mock conversations as needed
    ];
  }

  selectConversation(conv: Conversation) {
    this.selectedConversation = conv;
    this.currentChat = conv;
  }

  startNewConversation() {
    // TODO: Implement new conversation logic
    console.log('Starting new conversation');
  }

  startCall() {
    // TODO: Implement call logic
    console.log('Starting audio call');
  }

  startVideoCall() {
    // TODO: Implement video call logic
    console.log('Starting video call');
  }

  showInfo() {
    this.showInfoPanel = true;
  }

  openAttachmentMenu() {
    // TODO: Implement attachment menu
    console.log('Opening attachment menu');
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now(),
      text: this.newMessage,
      isSent: true,
      time: new Date().toLocaleTimeString(),
      sender: 'Me',
      avatar: 'assets/user-avatar.jpg'
    };

    if (this.selectedConversation) {
      this.selectedConversation.messages.push(message);
      this.newMessage = '';
    }
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    this.newMessage += emoji;
    this.showEmojiPicker = false;
  }

  toggleInfo() {
    this.showInfoPanel = !this.showInfoPanel;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    // TODO: Implement actual mute logic
    console.log('Mute toggled:', this.isMuted);
  }

  endCall() {
    this.activeCall = null;
    // TODO: Implement actual call end logic
    console.log('Call ended');
  }

  toggleVideo() {
    this.isVideoOff = !this.isVideoOff;
    // TODO: Implement actual video toggle logic
    console.log('Video toggled:', this.isVideoOff);
  }
}
