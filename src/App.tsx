import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

function App() {
  const [subject, setSubject] = useState("");
  const [verb, setVerb] = useState("");
  const [object, setObject] = useState("");
  const [sentences, setSentences] = useState<string[]>([]);
  const { toast } = useToast();

  const subjects = ["The cat", "My friend", "A scientist", "The teacher", "That bird"];
  const verbs = ["chased", "created", "discovered", "explained", "watched"];
  const objects = ["the mouse", "a new theory", "an ancient artifact", "the lesson", "the sunset"];

  const createSentence = () => {
    if (!subject || !verb || !object) {
      toast({
        title: "Incomplete sentence",
        description: "Please select all parts of the sentence",
        variant: "destructive",
      });
      return;
    }

    const newSentence = `${subject} ${verb} ${object}.`;
    setSentences((prev) => [newSentence, ...prev]);
    toast({
      title: "Sentence created!",
      description: newSentence,
    });
  };

  const clearAll = () => {
    setSubject("");
    setVerb("");
    setObject("");
    setSentences([]);
    toast({
      title: "All cleared",
      description: "Your sentence maker has been reset",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">Sentence Maker</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create a Sentence</CardTitle>
            <CardDescription>Select words from each category to build your sentence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">Subject</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium">Verb</label>
                <Select value={verb} onValueChange={setVerb}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verb" />
                  </SelectTrigger>
                  <SelectContent>
                    {verbs.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium">Object</label>
                <Select value={object} onValueChange={setObject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an object" />
                  </SelectTrigger>
                  <SelectContent>
                    {objects.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={createSentence} className="flex-1">Create Sentence</Button>
              <Button onClick={clearAll} variant="outline">Clear All</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Sentences</CardTitle>
            <CardDescription>
              {sentences.length > 0 
                ? `You have created ${sentences.length} sentence${sentences.length !== 1 ? 's' : ''}`
                : "No sentences created yet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sentences.length > 0 ? (
              <ul className="divide-y">
                {sentences.map((sentence, index) => (
                  <li key={index} className="py-2">
                    {sentence}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-slate-500">Create your first sentence above!</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}

export default App;