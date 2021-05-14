namespace NotificationService.Service
open System.Net
open System.Net.Http
open System.Text
open FsToolkit.ErrorHandling
open NotificationService.Services.Types.Errors

module NotificationApi =
    let private createPayload (text: string) =
        let encodedText = Json.JsonEncodedText.Encode text
        $"{{ \"text\": \"{encodedText}\" }}"
        
    let private assertSuccessStatusCode (response: HttpResponseMessage) =
        response.StatusCode = HttpStatusCode.OK
        |> Result.requireTrue (NotificationApiError.HttpRequestError response.StatusCode)
        
    let private assertTooManyRequests (responseContent: string) =
        responseContent.Contains "HTTP error 429"
        |> Result.requireFalse TooManyRequests
        
    let private assertCorrectResponseCode(responseContent: string) =
        responseContent = "1"
        |> Result.requireTrue (ResponseCodeIsNotSuccess responseContent)
        
    let sendChannelNotification (url: string) (text: string): Async<Result<unit, NotificationApiError>> =
        asyncResult {
            use client = new HttpClient ()
            
            let message = new StringContent(createPayload text, Encoding.UTF8, "application/json");
            try
                let! httpResponseMessage = client.PostAsync(url, message) |> Async.AwaitTask
                do! assertSuccessStatusCode httpResponseMessage
                
                let! responseContent = httpResponseMessage.Content.ReadAsStringAsync ()
                do! assertTooManyRequests responseContent
                do! assertCorrectResponseCode responseContent
                
            with error ->
                return! Error (NotificationApiError.NetworkError error) |> Async.singleton
        }

