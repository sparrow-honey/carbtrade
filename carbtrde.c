#include <stdio.h>
#include <stdlib.h>

int main()
{   float dist;
    char decision;
    float Carbon_OffsetPrice_Plane = 1800;//rupees
    float Carbon_Offsetprice_Truck = 1800;//rupees
    float carbon_plane = 31.1; //emission KG/KM
    float carbon_truck = 0.76;//emission KG/KM
    float totaltime_hours;
    float Plane_fuel = 11463.96; //rupees
    int Plane_speed =915;
    float Truck_fuel =30.4;//rupees
    float Truck_speed = 65.0; //KM/h
    float revenue_customer;
    float revenue_Carbtrade;
    int price_order;
    printf("ENTER THE PRICE OF THE ORDER\n");
    scanf("%d", &price_order);
    printf("ENTER THE DISTANCE IN KM:- \n");
    scanf("%f", &dist);
    printf("HELP IN ECO FREINDLY EARTH PROJECT BY PRESSING Y/N :-\n");
    scanf(" %c", &decision);
    if(decision == 'y'|| decision=='Y'){
       totaltime_hours =(dist/Truck_speed);  
       printf("time taken %.2f in minutes with truck \n", totaltime_hours *60.0);
       printf("Time taken %.2f  in days with truck \n",(totaltime_hours *60.0)/1440 );
       float total_days =(totaltime_hours *60.0)/1440 ;
       carbon_truck=carbon_truck*dist;
       printf("the carbon emission is %.2f in kg\n",carbon_truck );
       carbon_plane =carbon_plane*dist;
       printf("BUT the  carbon emission with plane is %.2f in kg\n",carbon_plane );
       Carbon_OffsetPrice_Plane =(carbon_plane*Carbon_OffsetPrice_Plane)/1000;
       printf("THE CARBON OFFSETS PRICE FOR PLANE :\t%.2f\n", Carbon_OffsetPrice_Plane);
       Carbon_Offsetprice_Truck =(carbon_truck*Carbon_Offsetprice_Truck)/1000;
       printf("THE CARBON OFFSETS PRICE FOR TRUCK :\t%.2f\n", Carbon_Offsetprice_Truck);
       float revenue  = Carbon_OffsetPrice_Plane -Carbon_Offsetprice_Truck;
       printf("%.2f\n", revenue);
       if (price_order<1000){
        revenue_customer =price_order*0.15;
       }
       else if(price_order>1000&&price_order<2500){
        revenue_customer =price_order*0.08;
       }
       else{
        revenue_customer =price_order*0.03;
       }
       printf("THE TOTAL AMOUNT SAVED :\t%.2f\n", revenue);
       revenue_Carbtrade=(revenue-revenue_customer)*0.05;
       float final_revenue = revenue -(revenue_customer+revenue_Carbtrade);
       printf("THE AMOUNT GOES TO SELLING COMPANY :\t%.2f\n", final_revenue);
       printf("THE AMOUNT GOES TO CARBTRADE :\t%.2f\n", revenue_Carbtrade);
       printf("THE AMOUNT GOES TO CUSTOMER :\t%.2f\n", revenue_customer);


        //ignore below code 

    //    float per =(((carbon_plane*dist)-(carbon_truck*dist))/(carbon_truck))*100;
    //    printf("we saved %.3f%% by choosing truck over plane \n", per);
    //    printf("Total price of fuel with truck %2f Rupees \n", Truck_fuel *dist);
    //    printf("Total price of fuel with Plane %2f Rupees \n", Plane_fuel *dist);
    //    float revenue  =  Plane_fuel *dist -Truck_fuel *dist ;
    //    printf("%.3f AMOUNT SAVED \n" , revenue);
    //    printf("%.3f FOR THE SELLING COMPANY\n" , revenue*0.999);
    //    printf("%.3f FOR THE CARBTRADE COMPANY\n" , revenue*0.0006);
    //    printf("%.3f COUPONS FOR THE CUSTOMER\n" , revenue*0.00004);

    }
    else{exit(0);
    }

    return 0;
}