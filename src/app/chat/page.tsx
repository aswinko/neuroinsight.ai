import { TextIcon } from "@radix-ui/react-icons";
import FileUpload from "@/src/components/FileUpload";

const Page: React.FC = () => {
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="grid w-full max-w-3xl px-4 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TextIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tighter">PDF Chat</h1>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <FileUpload />
          </div>
        </div>

        {/* <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label className="leading-none" htmlFor="conversation">
              Conversation
            </Label>
            <div className="border p-4 rounded-lg h-48 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${
                    message.role === "user" ? "user-message" : "system-message"
                  }`}
                >
                  <div className="chat-content">
                    <p className="message">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-1.5">
            <Textarea
              id="message"
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message"
              value={input}
              disabled={!isFileUploaded}
            />
          </div>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <Button type="submit" disabled={!isFileUploaded}>
                Send
              </Button>
            </form>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
