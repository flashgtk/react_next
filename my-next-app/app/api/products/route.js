export async function GET() {
    const products = [
        {
            id: 1,
            title: "Boat Earbuds",
            desc: "These wireless earbuds provide excellent sound quality and comfort, perfect for listening to music or taking calls on the go.",
            image: "/p1.jpg" 
        },
        {
            id: 2,
            title: "Smart Watch",
            desc: "Stay connected and track your fitness with this sleek smart watch, featuring heart rate monitoring, sleep tracking, and notifications.",
            image: "/p2.jpg"
        },
        {
            id: 3,
            title: "Bluetooth Speaker",
            desc: "Enjoy high-quality sound wherever you go with this portable Bluetooth speaker, ideal for outdoor adventures and indoor use.",
            image: "/p3.jpg"
        },
        {
            id: 4,
            title: "Laptop",
            desc: "This powerful laptop is perfect for work or play, featuring a fast processor, long battery life, and a high-resolution screen.",
            image: "/p4.jpg"
        },
        {
            id: 5,
            title: "Gaming Headset",
            desc: "Immerse yourself in the game with these high-quality, noise-cancelling gaming headphones, featuring 7.1 surround sound and a built-in microphone.",
            image: "/p5.jpg"
        }
    ];

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
