import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AzureFunctionService } from '../azure-function-service.service';

@Component({
  selector: 'app-chatai',
  templateUrl: './chatai.component.html',
  styleUrls: ['./chatai.component.css']
})

export class ChataiComponent {

  constructor(private azureFunctionService: AzureFunctionService) { }
  
  @ViewChild('chatDisplay') chatDisplay!: ElementRef; // ViewChild for the chat display element
  
  userInput: string = ''; // Initialize the input field
  response: any;  
  
  chatHistory: { user: string, bot: string }[] = [];
  
    updateChatDisplay(message: any) {
      const chatDisplayElement = this.chatDisplay.nativeElement;
      if (chatDisplayElement) {
        // Create a new message element
        const newMessage = document.createElement('p');
        newMessage.textContent = message; // Assuming message is a string, modify this as needed

        // Append the new message to the chat display
        chatDisplayElement.appendChild(newMessage);

        // Scroll to the bottom of the chat display
        chatDisplayElement.scrollTop = chatDisplayElement.scrollHeight;
      }
    }
    
  callAzureFunction(inputText: string) {
    this.azureFunctionService.getDetails(inputText).subscribe(
      (data: any) => {
        this.response = data;
        //this.updateChatDisplay(this.response);
      },
      (error: any) => {
        console.error('Error occurred:', error);
        // Handle errors here
      }      
    );
  }

  sendMessage1() { }

  sendMessage() {
    if (this.userInput.trim() !== '') {
      // Call Azure Function here

      this.azureFunctionService.getAIInformation(this.userInput).subscribe
      (
        (data: any) => {
          // Update the chat display with the response
          this.updateChatDisplay(data);
         }
        // ,
        // (error) => {
        //   console.error('Error occurred:', error);
        //   if (error.error instanceof ErrorEvent) {
        //     // Client-side error, such as network issues
        //     console.error('Client-side error:', error.error.message);
        //   } else {
        //     // Backend returned unsuccessful response code
        //     console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        //   }
        //   // Handle specific errors or display appropriate messages
        // }
      );


      // this.azureFunctionService.getDetails(this.userInput).subscribe(
      //   (data: any) => {
      //     // Update the chat display with the response
      //     this.updateChatDisplay(data);
      //   },
      //   (error) => {
      //     console.error('Error occurred:', error);
      //     if (error.error instanceof ErrorEvent) {
      //       // Client-side error, such as network issues
      //       console.error('Client-side error:', error.error.message);
      //     } else {
      //       // Backend returned unsuccessful response code
      //       console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      //     }
      //     // Handle specific errors or display appropriate messages
      //   }
      // );

      // Clear the input field after sending the message
      this.userInput = '';
    }
  }



}
