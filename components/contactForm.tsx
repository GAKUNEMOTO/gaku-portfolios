'use client';


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { EmailData } from "@/types/email";

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState: {errors},
    } = useForm({
        defaultValues: {
            name:'',
            email:'',
            message: '',
        }
    });

    const onSubmit = async (data: EmailData) => {
        try{
            setIsLoading(true);
            const res = await fetch('/gaku-portfolio/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const body = await res.json();

            if(res.ok){
                alert(`${body.message} sent`);
            }

            if(res.status === 400) {
                alert(`${body.message} cannot sent`);
            }
            setIsLoading(false);

        }catch(err){
            console.log('Something went wrong: ', err);
        }
    } 





    return (
        <Card className="w-3/5 h-2/5">
            <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>こちらからご連絡お待ちしていします!</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} >
                <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name" type="name" {...register('name', { required: true})}  />
                            {errors.name && <p>{errors.name.type}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email"  placeholder="Email" type="email" {...register('email', { required: true })} />
                            {errors.email && <p>{errors.email.type}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Textarea   placeholder="Type your message here." typeof="message" {...register('message',{ required: true})} />
                            {errors.message && <p>{errors.message.type}</p>}
                        </div>
                    </div>
                    <CardFooter className="flex px-3 py-4 justify-between">
                        <Button variant="outline" type="reset">Reset</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
    }
