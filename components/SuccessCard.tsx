import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


interface SuccessCardProps {
    email: string;
}

const SuccessCard: React.FC<SuccessCardProps> = ({email}) => {
    return(
        <div className=" h-lvh flex flex-col justify-center items-center">
        <Card className="w-1/2">
            <CardHeader>
                <CardContent>
                    <div className="w-full flex flex-row justify-center mb-5">
                        <p className="font-medium">Sign Up Successful 🎉</p>
                    </div>
                    <p className="text-center">We have sent an email to <span className="underline text-blue-400">{email}</span> for you to confirm your email. Please confirm before logging in.</p>
                </CardContent>
            </CardHeader>
        </Card>
        </div>
    )
}

export default SuccessCard;