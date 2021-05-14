namespace NotificationService.Service
open System.Net
open System.Net.Http
open System.Text
open FSharp.Control.Tasks

module NotificationApi =
    let private createPayload (text: string) =
        $"{{ \"text\": \"{text}\" }}"
        
    let sendChannelNotification (url: string) (text: string) =
        task {
            use client = new HttpClient ()
            
            // TODO: error handling
            let message = new StringContent(createPayload text, Encoding.UTF8, "application/json");
            let! response = client.PostAsync(url, message)
            
            return response.StatusCode = HttpStatusCode.OK
        }

