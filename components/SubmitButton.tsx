import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
      Submit
    </Button>
  );
};

export default SubmitButton;
