import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup = new FormGroup({});
  messages: { text: string, sender: 'user' | 'system' }[] = [];
  preparedResponses: string[] = [
    "Hello! How can I help you today?",
    "Please provide more details.",
    "Thank you for your message. We will get back to you shortly."
  ];
  chatVisible: boolean = false;

  ngOnInit() {
    this.chatForm = new FormGroup({
      message: new FormControl('')
    });
  }

  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  sendMessage() {
    const message = this.chatForm.get('message')?.value || '';
    if (message.trim()) {
      this.messages.push({ text: message, sender: 'user' });
      this.chatForm.reset();
      setTimeout(() => this.sendPreparedResponse(), 500);
    }
  }

  sendPreparedResponse() {
    const response = this.preparedResponses[Math.floor(Math.random() * this.preparedResponses.length)];
    this.messages.push({ text: response, sender: 'system' });
  }
}