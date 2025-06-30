---
title: Scheduling Algorithms
author: Arjit Sharma
meta_title: os
description: os
series: ["os"]
categories: ["Core-CS"]
---

As learnt CPU scheduling ensures efficient execution of processes by determining which one gets CPU time when multiple processes are competing for resources. The OS uses different algorithms to optimize performance, fairness, and responsiveness.

## Understanding CPU Scheduling

Since multiple processes run simultaneously, the OS must decide *which process gets CPU time next*. This is handled by the *short-term scheduler*, which selects from the ready queue and assigns CPU time.

### Scheduling Criteria

A good scheduling algorithm aims to optimize:

- **CPU Utilization** - Maximizing CPU usage.
- **Throughput** - Number of processes executed per unit time.
- **Turnaround Time** - Total time a process takes from creation to completion.
- **Waiting Time** - Time a process spends waiting in the ready queue.
- **Response Time** - Time taken for the first response after process submission.

---

## Types of CPU Scheduling Algorithms

### First-Come, First-Served (FCFS)

Processes are executed in the order they arrive in the ready queue

- Advantages: Simple to implement; fair in terms of arrival order.
- Disadvantages: Long processes can cause the convoy effect, where shorter processes are delayed, leading to high average waiting times.

*Example:* A printer queue processing documents in the order they are submitted.

### Shortest Job First (SJF) and Shortest Remaining Time First (SRTF)

SJF (Non-preemptive) is used to select the process with the shortest total execution time from the ready queue and runs it to completion.

SRTF (Preemptive): Continuously checks the ready queue and preempts the running process if a new process with a shorter remaining execution time arrives.

- Advantages: Minimizes average waiting time, theoretically optimal for throughput in non-preemptive cases.
- Disadvantages: Requires accurate prediction of execution times, which is often impractical. Can lead to starvation for long processes in SRTF, as shorter tasks keep preempting.

*Example:* In a video rendering pipeline, SJF might prioritize quick optimization tasks like resizing images over longer tasks like rendering a full video) to reduce overall wait time.

### Round Robin (RR)

Each process is assigned a fixed time slice (or time quantum, typically 10–100 milliseconds) and executed in a cyclic order. If a process doesn’t complete within its quantum, it’s preempted and returned to the ready queue.

- Advantages: Ensures fairness by giving all processes equal CPU time; responsive for interactive systems.
- Disadvantages: Performance depends on the quantum size—too short leads to excessive context switching, too long resembles FCFS with similar drawbacks.

*Example:*  In a multi-user OS, RR ensures applications like web browsers and text editors remain responsive by cycling through them quickly.

### Priority Scheduling

Each process is assigned a priority (e.g., a numerical value), and the process with the highest priority is executed first. It can be of both type pre-emptive and non-preemptive.

- Advantages: Ensures critical tasks are prioritized.
- Disadvantages: Lower-priority processes may suffer starvation if high-priority tasks dominate. Requires a mechanism to adjust priorities dynamically to mitigate this.

*Example:* In a medical monitoring system, a heart rate alert process takes precedence over background data logging to ensure timely response.

### Multilevel Queue Scheduling

Processes are divided into separate queues based on their type or priority (e.g., foreground for interactive tasks, background for batch jobs). Each queue has its own scheduling algorithm (e.g., RR for foreground, FCFS for background).

**Multilevel Feedback Queue Scheduling -** Extends multilevel queue scheduling by allowing processes to move between queues based on their behavior.

- Advantages: Tailors scheduling to process types, improving efficiency for mixed workloads.
- Disadvantages: Complex to implement and tune; requires careful configuration to avoid starvation or inefficiencies.

*Example:* In a desktop OS, a music player gets high priority to ensure smooth playback, while a file compression task is gradually demoted to lower-priority queues as it consumes more CPU.

---

## Conclusion

CPU scheduling is crucial for **efficient multitasking**, ensuring all processes receive fair CPU time while optimizing system performance. Whether running a simple script or managing complex server workloads, understanding these algorithms helps in debugging and system tuning.