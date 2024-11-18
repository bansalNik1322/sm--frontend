// // 'use client';
// // import SendIcon from '@mui/icons-material/Send';
// // import { Box, Card, Divider, IconButton, styled, TextField, Typography } from '@mui/material';
// // import { subDays, subHours, subMinutes } from 'date-fns';
// // import moment from 'moment-timezone';
// // import React, { FC, useEffect, useRef, useState } from 'react';

// // import { generateRecipe } from '@/utils/genai';

// // const formatTime = (date: Date) => {
// //   return moment.tz(date, 'Asia/Kolkata').format('hh:mm A');
// // };

// // const DividerWrapper = styled(Divider)(
// //   ({ theme }) => `
// //     .MuiDivider-wrapper {
// //         border-radius: ${theme.general.borderRadiusSm};
// //         text-transform: none;
// //         background: ${theme.palette.background.default};
// //         font-size: ${theme.typography.pxToRem(13)};
// //         color: ${theme.colors.alpha.black[50]};
// //     }
// // `,
// // );

// // const CardWrapperPrimary = styled(Card)(
// //   ({ theme }) => `
// //     background: ${theme.colors.primary.main};
// //     color: ${theme.palette.primary.contrastText};
// //     padding: ${theme.spacing(2)};
// //     border-radius: ${theme.general.borderRadiusXl};
// //     border-top-right-radius: ${theme.general.borderRadius};
// //     max-width: 380px;
// //     display: inline-flex;
// // `,
// // );

// // const CardWrapperSecondary = styled(Card)(
// //   ({ theme }) => `
// //     background: ${theme.colors.alpha.black[10]};
// //     color: ${theme.colors.alpha.black[100]};
// //     padding: ${theme.spacing(2)};
// //     border-radius: ${theme.general.borderRadiusXl};
// //     border-top-left-radius: ${theme.general.borderRadius};
// //     max-width: 380px;
// //     display: inline-flex;
// // `,
// // );

// // const messages = [
// //   {
// //     sender: 'Bot',
// //     avatar: '/static/images/avatars/2.jpg',
// //     content: 'Hi. Can you send me the missing invoices asap?',
// //     timestamp: subHours(new Date(), 115),
// //     isSender: false,
// //     date: subDays(new Date(), 3),
// //   },
// //   {
// //     sender: 'You',
// //     avatar: '/static/images/avatars/1.jpg',
// //     content: "Yes, I'll email them right now. I'll let you know once the remaining invoices are done.",
// //     timestamp: subHours(new Date(), 125),
// //     isSender: true,
// //     date: subDays(new Date(), 3),
// //   },
// //   {
// //     sender: 'Bot',
// //     avatar: '/static/images/avatars/2.jpg',
// //     content: 'Hey! Are you there?',
// //     timestamp: subHours(new Date(), 60),
// //     isSender: false,
// //     date: subDays(new Date(), 5),
// //   },
// //   {
// //     sender: 'You',
// //     avatar: '/static/images/avatars/1.jpg',
// //     content: 'Heeeelloooo????',
// //     timestamp: subHours(new Date(), 60),
// //     isSender: true,
// //     date: subDays(new Date(), 5),
// //   },
// //   {
// //     sender: 'Bot',
// //     avatar: '/static/images/avatars/2.jpg',
// //     content: 'Hey there!',
// //     timestamp: subMinutes(new Date(), 6),
// //     isSender: false,
// //     date: new Date(),
// //   },
// //   {
// //     sender: 'Bot',
// //     avatar: '/static/images/avatars/2.jpg',
// //     content: 'How are you? Is it ok if I call you?',
// //     timestamp: subMinutes(new Date(), 6),
// //     isSender: false,
// //     date: new Date(),
// //   },
// //   {
// //     sender: 'You',
// //     avatar: '/static/images/avatars/1.jpg',
// //     content: 'Hello, I just got my Amazon order shipped and I’m very happy about that.',
// //     timestamp: subMinutes(new Date(), 8),
// //     isSender: true,
// //     date: new Date(),
// //   },
// //   {
// //     sender: 'You',
// //     avatar: '/static/images/avatars/1.jpg',
// //     content: 'Can you confirm?',
// //     timestamp: subMinutes(new Date(), 8),
// //     isSender: true,
// //     date: new Date(),
// //   },
// // ];
// // const Index: FC = () => {
// //   const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user'; timestamp: string }[]>([]);
// //   const [input, setInput] = useState('');
// //   const messagesEndRef = useRef<HTMLDivElement | null>(null);

// //   const handleSend = async () => {
// //     if (input.trim() !== '') {
// //       const userMessage: { text: string; sender: 'user'; timestamp: string } = {
// //         text: input,
// //         sender: 'user',
// //         timestamp: formatTime(new Date()),
// //       };
// //       setMessages(prevMessages => [...prevMessages, userMessage]);
// //       setInput('');

// //       // Generate a response from the Google AI service
// //       try {
// //         const botResponse = await generateRecipe(input);
// //         const botMessage: { text: string; sender: 'bot'; timestamp: string } = {
// //           text: botResponse,
// //           sender: 'bot',
// //           timestamp: formatTime(new Date()),
// //         };
// //         setMessages(prevMessages => [...prevMessages, botMessage]);
// //       } catch (error) {
// //         const errorMessage: { text: string; sender: 'bot'; timestamp: string } = {
// //           text: 'Sorry, I could not generate a recipe at this moment. Please try again later.',
// //           sender: 'bot',
// //           timestamp: formatTime(new Date()),
// //         };
// //         setMessages(prevMessages => [...prevMessages, errorMessage]);
// //       }
// //     }
// //   };

// //   // Scroll to the bottom whenever messages change
// //   useEffect(() => {
// //     if (messagesEndRef.current) {
// //       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
// //     }
// //   }, [messages]);
// //   return (
// //     <Box p={3}>
// //       {messages.reduce<JSX.Element[]>((acc, message, index) => {
// //         // Type the accumulator as JSX.Element[]
// //         // Add a date divider if the date has changed from the previous message
// //         if (index === 0 || format(message.date, 'MMMM dd yyyy') !== format(messages[index - 1].date, 'MMMM dd yyyy')) {
// //           acc.push(
// //             <DividerWrapper key={`date-${message.date}`}>{format(message.date, 'MMMM dd yyyy')}</DividerWrapper>,
// //           );
// //         }

// //         acc.push(
// //           <Box
// //             key={index}
// //             display="flex"
// //             alignItems="flex-start"
// //             justifyContent={message.isSender ? 'flex-end' : 'flex-start'}
// //             py={3}
// //           >
// //             {message.isSender ? (
// //               <>
// //                 <Box display="flex" alignItems="flex-end" flexDirection="column" justifyContent="flex-end" mr={2}>
// //                   <CardWrapperPrimary>{message.content}</CardWrapperPrimary>
// //                   <Typography
// //                     variant="subtitle1"
// //                     sx={{
// //                       pt: 1,
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                     }}
// //                   >
// //                     <ScheduleTwoToneIcon
// //                       sx={{
// //                         mr: 0.5,
// //                       }}
// //                       fontSize="small"
// //                     />
// //                     {formatDistance(message.timestamp, new Date(), {
// //                       addSuffix: true,
// //                     })}
// //                   </Typography>
// //                 </Box>
// //                 <Avatar
// //                   variant="rounded"
// //                   sx={{
// //                     width: 50,
// //                     height: 50,
// //                   }}
// //                   alt={message.sender}
// //                   src={message.avatar}
// //                 />
// //               </>
// //             ) : (
// //               <>
// //                 <Avatar
// //                   variant="rounded"
// //                   sx={{
// //                     width: 50,
// //                     height: 50,
// //                   }}
// //                   alt={message.sender}
// //                   src={message.avatar}
// //                 />
// //                 <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="flex-start" ml={2}>
// //                   <CardWrapperSecondary>{message.content}</CardWrapperSecondary>
// //                   <Typography
// //                     variant="subtitle1"
// //                     sx={{
// //                       pt: 1,
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                     }}
// //                   >
// //                     <ScheduleTwoToneIcon
// //                       sx={{
// //                         mr: 0.5,
// //                       }}
// //                       fontSize="small"
// //                     />
// //                     {formatDistance(message.timestamp, new Date(), {
// //                       addSuffix: true,
// //                     })}
// //                   </Typography>
// //                 </Box>
// //               </>
// //             )}
// //           </Box>,
// //         );

// //         return acc;
// //       }, [])}
// //     </Box>
// //   );
// // };

// // export default Index;

// // /*

// //       <Box
// //         sx={{
// //           flex: 1,
// //           overflowY: 'auto',
// //           p: 2,
// //           bgcolor: 'background.paper',
// //         }}
// //       >
// //         {messages.map((msg, index) => (
// //           <Box
// //             key={index}
// //             sx={{
// //               display: 'flex',
// //               justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
// //               mb: 1,
// //             }}
// //           >
// //             <Box
// //               sx={{
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 maxWidth: '70%',
// //               }}
// //             >
// //               <Typography
// //                 sx={{
// //                   p: 1.5,
// //                   borderRadius: 2,
// //                   bgcolor: msg.sender === 'user' ? 'secondary.light' : 'primary.light',
// //                   color: 'text.primary',
// //                   wordWrap: 'break-word', // Allow long text to wrap
// //                   whiteSpace: 'pre-wrap', // Preserve line breaks
// //                 }}
// //               >
// //                 {msg.text}
// //               </Typography>
// //               <Typography
// //                 variant="caption"
// //                 sx={{
// //                   alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
// //                   color: 'text.secondary',
// //                   mt: 0.5,
// //                 }}
// //               >
// //                 {msg.timestamp}
// //               </Typography>
// //             </Box>
// //           </Box>
// //         ))}

// //         <div ref={messagesEndRef} />
// //       </Box>

// //       <Box
// //         sx={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           p: 2,
// //           borderTop: '1px solid',
// //           borderColor: 'divider',
// //           bgcolor: 'background.default',
// //         }}
// //       >
// //         <TextField
// //           variant="outlined"
// //           fullWidth
// //           value={input}
// //           onChange={e => setInput(e.target.value)}
// //           onKeyPress={e => {
// //             if (e.key === 'Enter') {
// //               handleSend();
// //             }
// //           }}
// //           placeholder="Type your message..."
// //         />
// //         <IconButton onClick={handleSend} color="primary">
// //           <SendIcon />
// //         </IconButton>
// //       </Box>
// // */

// import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
// import { Avatar, Box, Card, Divider, styled, Typography } from '@mui/material';
// import { format, formatDistance, subDays, subHours, subMinutes } from 'date-fns';

// const DividerWrapper = styled(Divider)(
//   ({ theme }) => `
//     .MuiDivider-wrapper {
//         border-radius: ${theme.general.borderRadiusSm};
//         text-transform: none;
//         background: ${theme.palette.background.default};
//         font-size: ${theme.typography.pxToRem(13)};
//         color: ${theme.colors.alpha.black[50]};
//     }
//   `,
// );

// const CardWrapperPrimary = styled(Card)(
//   ({ theme }) => `
//     background: ${theme.colors.primary.main};
//     color: ${theme.palette.primary.contrastText};
//     padding: ${theme.spacing(2)};
//     border-radius: ${theme.general.borderRadiusXl};
//     border-top-right-radius: ${theme.general.borderRadius};
//     max-width: 380px;
//     display: inline-flex;
//   `,
// );

// const CardWrapperSecondary = styled(Card)(
//   ({ theme }) => `
//     background: ${theme.colors.alpha.black[10]};
//     color: ${theme.colors.alpha.black[100]};
//     padding: ${theme.spacing(2)};
//     border-radius: ${theme.general.borderRadiusXl};
//     border-top-left-radius: ${theme.general.borderRadius};
//     max-width: 380px;
//     display: inline-flex;
//   `,
// );

// const messages = [
//   {
//     sender: 'Zain Baptista',
//     avatar: '/static/images/avatars/2.jpg',
//     content: 'Hi. Can you send me the missing invoices asap?',
//     timestamp: subHours(new Date(), 115),
//     isSender: false,
//     date: subDays(new Date(), 3),
//   },
//   {
//     sender: 'Catherine Pike',
//     avatar: '/static/images/avatars/1.jpg',
//     content: "Yes, I'll email them right now. I'll let you know once the remaining invoices are done.",
//     timestamp: subHours(new Date(), 125),
//     isSender: true,
//     date: subDays(new Date(), 3),
//   },
//   {
//     sender: 'Zain Baptista',
//     avatar: '/static/images/avatars/2.jpg',
//     content: 'Hey! Are you there?',
//     timestamp: subHours(new Date(), 60),
//     isSender: false,
//     date: subDays(new Date(), 5),
//   },
//   {
//     sender: 'Catherine Pike',
//     avatar: '/static/images/avatars/1.jpg',
//     content: 'Heeeelloooo????',
//     timestamp: subHours(new Date(), 60),
//     isSender: true,
//     date: subDays(new Date(), 5),
//   },
//   {
//     sender: 'Zain Baptista',
//     avatar: '/static/images/avatars/2.jpg',
//     content: 'Hey there!',
//     timestamp: subMinutes(new Date(), 6),
//     isSender: false,
//     date: new Date(),
//   },
//   {
//     sender: 'Zain Baptista',
//     avatar: '/static/images/avatars/2.jpg',
//     content: 'How are you? Is it ok if I call you?',
//     timestamp: subMinutes(new Date(), 6),
//     isSender: false,
//     date: new Date(),
//   },
//   {
//     sender: 'Catherine Pike',
//     avatar: '/static/images/avatars/1.jpg',
//     content: 'Hello, I just got my Amazon order shipped and I’m very happy about that.',
//     timestamp: subMinutes(new Date(), 8),
//     isSender: true,
//     date: new Date(),
//   },
//   {
//     sender: 'Catherine Pike',
//     avatar: '/static/images/avatars/1.jpg',
//     content: 'Can you confirm?',
//     timestamp: subMinutes(new Date(), 8),
//     isSender: true,
//     date: new Date(),
//   },
// ];

// function ChatContent() {
//   const user = {
//     name: 'Catherine Pike',
//     avatar: '/static/images/avatars/1.jpg',
//   };

//   return (
//     <Box p={3}>
//       {messages.reduce<JSX.Element[]>((acc, message, index) => {  // Type the accumulator as JSX.Element[]
//         // Add a date divider if the date has changed from the previous message
//         if (index === 0 || format(message.date, 'MMMM dd yyyy') !== format(messages[index - 1].date, 'MMMM dd yyyy')) {
//           acc.push(
//             <DividerWrapper key={`date-${message.date}`}>
//               {format(message.date, 'MMMM dd yyyy')}
//             </DividerWrapper>
//           );
//         }

//         acc.push(
//           <Box
//             key={index}
//             display="flex"
//             alignItems="flex-start"
//             justifyContent={message.isSender ? 'flex-end' : 'flex-start'}
//             py={3}
//           >
//             {message.isSender ? (
//               <>
//                 <Box display="flex" alignItems="flex-end" flexDirection="column" justifyContent="flex-end" mr={2}>
//                   <CardWrapperPrimary>{message.content}</CardWrapperPrimary>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       pt: 1,
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <ScheduleTwoToneIcon
//                       sx={{
//                         mr: 0.5,
//                       }}
//                       fontSize="small"
//                     />
//                     {formatDistance(message.timestamp, new Date(), {
//                       addSuffix: true,
//                     })}
//                   </Typography>
//                 </Box>
//                 <Avatar
//                   variant="rounded"
//                   sx={{
//                     width: 50,
//                     height: 50,
//                   }}
//                   alt={message.sender}
//                   src={message.avatar}
//                 />
//               </>
//             ) : (
//               <>
//                 <Avatar
//                   variant="rounded"
//                   sx={{
//                     width: 50,
//                     height: 50,
//                   }}
//                   alt={message.sender}
//                   src={message.avatar}
//                 />
//                 <Box display="flex" alignItems="flex-start" flexDirection="column" justifyContent="flex-start" ml={2}>
//                   <CardWrapperSecondary>{message.content}</CardWrapperSecondary>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       pt: 1,
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <ScheduleTwoToneIcon
//                       sx={{
//                         mr: 0.5,
//                       }}
//                       fontSize="small"
//                     />
//                     {formatDistance(message.timestamp, new Date(), {
//                       addSuffix: true,
//                     })}
//                   </Typography>
//                 </Box>
//               </>
//             )}
//           </Box>
//         );

//         return acc;
//       }, [])}
//     </Box>
//   );
// }

// export default ChatContent;
