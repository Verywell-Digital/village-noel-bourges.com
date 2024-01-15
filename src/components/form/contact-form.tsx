"use client";

import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Title from "../ui/title";
import { Toaster, toast } from "sonner";

interface FormProps {
  title?: string;
  description?: string;
  siteOrigin: string;
  emailDestinationAddress: string;
  emailSubject: string;
  [key: string]: any; //any other props
  //   popup: boolean;
}

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit comporter au moins 2 caractères.",
  }),
  lastName: z
    .string()
    .min(2, {
      message: "Le nom de famille doit comporter au moins 2 caractères.",
    })
    .optional(),
  email: z
    .string()
    .email({
      message: "L'email doit être une adresse email valide.",
    })
    .optional(),
  phone: z
    .string()
    .min(10, {
      message: "Le numéro de téléphone doit comporter au moins 10 chiffres.",
    })
    .optional(),
  sector: z
    .string()
    .min(2, {
      message: "Le secteur doit comporter au moins 2 caractères.",
    })
    .optional(),
  request: z
    .string()
    .min(10, {
      message: "La demande doit comporter au moins 10 caractères.",
    })
    .optional(),
});

const labels = {
  firstName: "Prénom",
  lastName: "Nom",
  email: "Email",
  phone: "Téléphone",
  sector: "Secteur d'activité",
  request: "Votre demande en quelques lignes",
};

export function ContactForm({
  title,
  description,
  hideFields,
  submit,
  siteOrigin,
  emailDestinationAddress,
  emailSubject,
}: FormProps) {
  console.log("🚀 ~ file: contact-form.tsx:85 ~ siteOrigin:", siteOrigin)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      sector: hideFields?.sector ? "none" : "",
      request: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedData = Object.entries(values)
      .map(([key, value]) => `${labels[key]}: ${value}`)
      .join("\n");

    const emailBody = `Bonjour,
    \nVous avez reçu une demande de contact depuis le ${emailSubject.toLowerCase()} du site ${siteOrigin}.
    \nVoici les informations récoltées :
    \n${formattedData}`;
    // console.log("🚀 ~ file: contact-form.tsx:109 ~ onSubmit ~ emailBody:", emailBody)

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: emailBody,
          emailDestinationAddress,
          emailSubject,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast("Email envoyé avec succès !");
        form.reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast("Erreur lors de l'envoi de l'email");
    }
  }

  return (
    <Form {...form}>
      {title && (
        <Title
          level={4}
          className="mb-3 font-semibold normal-case text-primary "
        >
          {title}
        </Title>
      )}
      {description && <p className="mb-6">{description}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full flex-row justify-between space-x-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`${field.value ? "text-primary" : ""}`}>
                  Prénom
                </FormLabel>
                <FormControl>
                  <Input className="input" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`${field.value ? "text-primary" : ""}`}>
                  Nom
                </FormLabel>
                <FormControl>
                  <Input className="input" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-row justify-between space-x-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`${field.value ? "text-primary" : ""}`}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="input"
                    type="email"
                    placeholder="john.doe@email.fr"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className={`${field.value ? "text-primary" : ""}`}>
                  Téléphone
                </FormLabel>
                <FormControl>
                  <Input
                    className="input"
                    placeholder="06 01 02 03 04"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!hideFields?.sector && (
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${field.value ? "text-primary" : ""}`}>
                  {`Secteur d'activité`}
                </FormLabel>
                <FormControl>
                  <Input className="input" placeholder="Bonjour.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="request"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`${field.value ? "text-primary" : ""}`}>
                Votre demande en quelques lignes
              </FormLabel>
              <FormControl>
                <Input className="input" placeholder="Bonjour.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="ghost" type="submit">
          Envoyer <ButtonIcon />
        </Button>
      </form>
      <Toaster />
    </Form>
  );
}
